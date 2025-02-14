import { error, redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import { products, type Product } from '../../../utils/products';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import type { CartItem } from '$lib/stores/cart.svelte';
import { markdownToText } from '$lib/utils';

type CartItemDto = Omit<CartItem, 'id' | 'product'>;

/**
 * Validates if the provided item conforms to the CartItem type.
 * Throws an error if validation fails.
 */
function validateCartItem(item: unknown): asserts item is CartItemDto {
	if (typeof item !== 'object' || item === null) {
		throw error(400, `Invalid basket item: ${JSON.stringify(item)}`);
	}

	const { slug, features, quantity } = item as CartItem;
	if (typeof slug !== 'string') {
		throw error(400, `Invalid or missing productSlug in basket item: ${JSON.stringify(item)}`);
	}

	if (features !== undefined && (typeof features !== 'object' || features === null)) {
		throw error(400, `Invalid features in basket item: ${JSON.stringify(item)}`);
	}

	if (typeof quantity !== 'number' || quantity <= 0) {
		throw error(400, `Invalid quantity in basket item: ${JSON.stringify(item)}`);
	}
}

/**
 * Calculates the unit amount for a product, including any price modifications from features.
 */
function calculateUnitAmountWithFeatures(
	product: Product,
	features: Record<string, string> | undefined
): number {
	let unitAmount = product.price;

	if (features && product.features) {
		for (const feature of product.features) {
			const featureName = feature.name;
			const selectedVariation = features[featureName];

			if (!selectedVariation) {
				throw error(400, `Missing variation for feature: "${featureName}"`);
			}

			const matchingVariation = feature.variations.find((v) => v.name === selectedVariation);
			if (!matchingVariation) {
				const validVariations = feature.variations.map((v) => v.name).join(', ');
				throw error(
					400,
					`Invalid variation for feature "${featureName}". Valid values are: ${validVariations}`
				);
			}

			if (matchingVariation.priceModifier) {
				unitAmount = matchingVariation.priceModifier(
					unitAmount,
					product,
					matchingVariation,
					feature
				);
			}
		}
	}

	if (typeof unitAmount !== 'number' || isNaN(unitAmount) || unitAmount <= 0) {
		throw error(500, `Calculated unit amount for product "${product.name}" is invalid`);
	}

	return unitAmount;
}

/**
 * Converts a BasketItem into a Stripe LineItem for the checkout session.
 */
function convertToStripeLineItem(
	item: CartItemDto,
	origin: string
): Stripe.Checkout.SessionCreateParams.LineItem {
	const product = products.find((p) => p.slug === item.slug);
	if (!product) {
		throw error(404, `Product with slug "${item.slug}" does not exist`);
	}

	const unitAmount = calculateUnitAmountWithFeatures(product, item.features);
	const productName =
		product.name +
		(item.features
			? `, ${Object.entries(item.features)
					.map(([k, v]) => `${k} ${v}`)
					.join(', ')}`
			: '');

	return {
		price_data: {
			currency: 'usd',
			tax_behavior: 'exclusive',
			product_data: {
				name: productName,
				description: markdownToText(product.description),
				images: product.images.map((image) => new URL('/images/products/' + image, origin).href)
			},
			unit_amount: Math.round(unitAmount * 100)
		},
		quantity: item.quantity
	};
}

/**
 * Handles the POST request to create a Stripe checkout session.
 */
export async function POST({ request }) {
	const origin = request.headers.get('origin');
	if (!origin) {
		throw error(400, 'Missing "Origin" header');
	}

	let body;

	try {
		body = await request.formData();
	} catch (e) {
		if (e instanceof SyntaxError) {
			throw error(400, 'Invalid request: Body must be a form data object');
		} else {
			throw error(500, 'Internal server error: Failed to parse request body');
		}
	}

	const cartRaw = body.get('cart') as string;
	const cart = JSON.parse(cartRaw) as CartItemDto[];

	if (!cart || typeof cart !== 'object' || !Array.isArray(cart)) {
		throw error(400, 'Invalid or missing cart data');
	}

	cart.forEach(validateCartItem);

	if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === "disabled") {
		throw error(500, 'Internal server error: Stripe is not configured');
	}

	const stripe = new Stripe(STRIPE_SECRET_KEY);
	const lineItems = cart.map((item) => convertToStripeLineItem(item, origin));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: lineItems,
		allow_promotion_codes: true,
		automatic_tax: { enabled: true },
		mode: 'payment',
		success_url: `${origin}/checkout/success`,
		cancel_url: `${origin}/checkout/cancel`
	});

	if (!session?.url) {
		console.error('Stripe session creation failed:', session);
		throw error(500, 'Failed to create Stripe session');
	}

	return redirect(303, session.url);
}
