<script>
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		// Register service worker for offline functionality
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js')
				.then(registration => {
					console.log('SW registered: ', registration);
				})
				.catch(registrationError => {
					console.log('SW registration failed: ', registrationError);
				});
		}
	});
</script>

<main>
	<slot />
</main>

<style>
	main {
		height: 100vh;
		overflow: hidden;
	}
</style>