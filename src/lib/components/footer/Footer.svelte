<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
	import { socials } from '../../../utils/socials';

	function changeTheme() {
		theme.toggleTheme();
	}
</script>

<footer
	class="flex flex-col justify-between gap-4 border-t bg-white p-[24px_40px] text-sm dark:border-[#2C2C2F] dark:bg-[#1b1b1b] md:flex-row"
>
	<div class="flex items-center gap-3">
		<div class="theme-card desktop-only theme-icons gap-2">
			<button
				class:is-selected-theme={!theme.isDarkTheme()}
				on:click={changeTheme}
				aria-label="light theme"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M12 3V5.25M18.364 5.636L16.773 7.227M21 12H18.75M18.364 18.364L16.773 16.773M12 18.75V21M7.227 16.773L5.636 18.364M5.25 12H3M7.227 7.227L5.636 5.636M15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75C11.0054 15.75 10.0516 15.3549 9.34835 14.6517C8.64509 13.9484 8.25 12.9946 8.25 12C8.25 11.0054 8.64509 10.0516 9.34835 9.34835C10.0516 8.64509 11.0054 8.25 12 8.25C12.9946 8.25 13.9484 8.64509 14.6517 9.34835C15.3549 10.0516 15.75 11.0054 15.75 12Z"
						stroke={theme.isDarkTheme() ? 'white' : 'black'}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<button
				class:is-selected-theme={theme.isDarkTheme()}
				on:click={changeTheme}
				aria-label="dark theme"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M21.752 15.002C20.5632 15.4974 19.2879 15.7517 18 15.75C12.615 15.75 8.25 11.385 8.25 5.99999C8.25 4.66999 8.516 3.40299 8.998 2.24799C7.22147 2.9891 5.70397 4.23934 4.63663 5.84124C3.56928 7.44314 2.99984 9.32507 3 11.25C3 16.635 7.365 21 12.75 21C14.6749 21.0002 16.5568 20.4307 18.1587 19.3634C19.7606 18.296 21.0109 16.7785 21.752 15.002Z"
						stroke={theme.isDarkTheme() ? 'white' : 'black'}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>

		<div>
			Deployed by <a href="https://appwrite.io" target="_blank">Appwrite</a>. Source code available
			on
			<a href="https://github.com/appwrite/template-for-store" target="_blank">GitHub</a>.
		</div>
	</div>

	<div class="flex justify-between gap-4">
		<div class="theme-card mobile-only theme-icons gap-2">
			<button
				class:is-selected-theme={!theme.isDarkTheme()}
				on:click={changeTheme}
				aria-label="light theme"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M12 3V5.25M18.364 5.636L16.773 7.227M21 12H18.75M18.364 18.364L16.773 16.773M12 18.75V21M7.227 16.773L5.636 18.364M5.25 12H3M7.227 7.227L5.636 5.636M15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75C11.0054 15.75 10.0516 15.3549 9.34835 14.6517C8.64509 13.9484 8.25 12.9946 8.25 12C8.25 11.0054 8.64509 10.0516 9.34835 9.34835C10.0516 8.64509 11.0054 8.25 12 8.25C12.9946 8.25 13.9484 8.64509 14.6517 9.34835C15.3549 10.0516 15.75 11.0054 15.75 12Z"
						stroke={theme.isDarkTheme() ? 'white' : 'black'}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<button
				class:is-selected-theme={theme.isDarkTheme()}
				on:click={changeTheme}
				aria-label="dark theme"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M21.752 15.002C20.5632 15.4974 19.2879 15.7517 18 15.75C12.615 15.75 8.25 11.385 8.25 5.99999C8.25 4.66999 8.516 3.40299 8.998 2.24799C7.22147 2.9891 5.70397 4.23934 4.63663 5.84124C3.56928 7.44314 2.99984 9.32507 3 11.25C3 16.635 7.365 21 12.75 21C14.6749 21.0002 16.5568 20.4307 18.1587 19.3634C19.7606 18.296 21.0109 16.7785 21.752 15.002Z"
						stroke={theme.isDarkTheme() ? 'white' : 'black'}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>

		<div class="flex items-center gap-2">
			{#each socials as social (social.link)}
				<a aria-label={social.label} class="social-card" href={social.link} target="_blank">
					<span class="svg-wrapper">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html social.icon}
					</span>
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	footer {
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		margin-top: auto;
		font-style: normal;
		letter-spacing: -0.063px;
		color: var(--color-fgColor-neutral-secondary, #56565c);

		& a {
			color: #19191c;
			font-weight: 400;
			line-height: 140%;
			font-style: normal;
			letter-spacing: -0.063px;
			text-decoration: underline;
			font-size: var(--font-size-S, 14px);
		}
	}

	:global(html.dark footer) {
		color: #a3a3a0;

		& a {
			color: #e6e6e3;
		}
	}

	.social-card {
		padding: var(--space-2, 4px);
		border-radius: var(--border-radius-S, 8px);
		border: var(--border-width-S, 1px) solid var(--color-border-neutral-strong, #d8d8db);

		transition: border 0.3s ease-in-out;

		&:hover {
			border: var(--border-width-S, 1px) solid #9f9fa7;
		}
	}

	:global(html.dark .social-card) {
		border: var(--border-width-S, 1px) solid var(--color-border-neutral-strong, #56565c);
	}

	.svg-wrapper {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme-card {
		display: flex;
		align-items: flex-start;
		gap: var(--space-1, 2px);
		border: 1px solid #ededf0;
		padding: var(--space-1, 2px);
		border-radius: var(--border-radius-S, 8px);
	}

	:global(html.dark .theme-card) {
		border: 1px solid #2c2c2f;
	}

	.theme-card svg {
		padding: var(--space-2, 4px);
	}

	.is-selected-theme {
		background: #ededf0;
		border-radius: var(--border-radius-XS, 6px);
	}

	:global(html.dark .is-selected-theme) {
		background: #2c2c2f;
	}

	.mobile-only {
		display: none;
	}

	@media (max-width: 768px) {
		.desktop-only {
			display: none;
		}

		.mobile-only {
			display: flex;
		}
	}
</style>
