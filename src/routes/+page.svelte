<script>
	import { onMount } from 'svelte';
	import { travelSearch } from '../lib/travelSearch.js';

	let messages = [
		{
			id: 1,
			type: 'assistant',
			content: '¡Hola! Soy tu asistente personal para Europa. Preguntame sobre qué hacer, dónde comer, cómo moverte o cualquier cosa sobre Madrid, Barcelona, Roma, Amsterdam, París, Venecia o Florencia.\n\n**Todo funciona offline** ✈️ - perfecto para tus viajes.'
		}
	];

	let inputText = '';
	let isTyping = false;
	let messageContainer;

	const suggestions = [
		'¿Qué hacer esta tarde en Roma?',
		'Restaurantes baratos en París',
		'Cómo ir del aeropuerto al centro en Amsterdam',
		'Mejores museos en Madrid'
	];

	function scrollToBottom() {
		if (messageContainer) {
			setTimeout(() => {
				messageContainer.scrollTop = messageContainer.scrollHeight;
			}, 100);
		}
	}

	async function sendMessage(text = inputText.trim()) {
		if (!text) return;

		// Add user message
		const userMessage = {
			id: Date.now(),
			type: 'user',
			content: text
		};
		
		messages = [...messages, userMessage];
		inputText = '';
		scrollToBottom();

		// Show typing indicator
		isTyping = true;
		scrollToBottom();

		try {
			// Simulate processing time for better UX
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// Get response from travel search
			const response = await travelSearch(text);
			
			// Add assistant response
			const assistantMessage = {
				id: Date.now() + 1,
				type: 'assistant',
				content: response
			};
			
			isTyping = false;
			messages = [...messages, assistantMessage];
			scrollToBottom();
		} catch (error) {
			isTyping = false;
			const errorMessage = {
				id: Date.now() + 1,
				type: 'assistant',
				content: 'Lo siento, hubo un error procesando tu pregunta. ¿Podés intentar de nuevo?'
			};
			messages = [...messages, errorMessage];
			scrollToBottom();
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function useSuggestion(suggestion) {
		inputText = suggestion;
		sendMessage();
	}

	onMount(() => {
		scrollToBottom();
	});
</script>

<svelte:head>
	<title>Europe Travel Assistant</title>
	<meta name="description" content="Tu asistente turístico offline para Europa" />
</svelte:head>

<div class="container">
	<div class="header">
		<h1>🇪🇺 Europe Travel Assistant</h1>
		<div class="subtitle">Tu guía personal para Madrid, Barcelona, Roma, Amsterdam, París, Venecia, Florencia</div>
	</div>
	
	<div class="suggestions">
		{#each suggestions as suggestion}
			<button class="suggestion" on:click={() => useSuggestion(suggestion)}>
				{suggestion}
			</button>
		{/each}
	</div>
	
	<div class="chat-container" bind:this={messageContainer}>
		{#each messages as message (message.id)}
			<div class="message {message.type}">
				{#if message.type === 'assistant'}
					<div class="avatar">🇪🇺</div>
				{/if}
				<div class="message-content">
					{@html message.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
				</div>
			</div>
		{/each}
		
		{#if isTyping}
			<div class="message assistant">
				<div class="avatar">🇪🇺</div>
				<div class="typing-indicator">
					<div class="typing-dots">
						<div class="dot"></div>
						<div class="dot"></div>
						<div class="dot"></div>
					</div>
					<span style="font-size: 14px; color: #666;">Escribiendo...</span>
				</div>
			</div>
		{/if}
	</div>
	
	<div class="input-container">
		<textarea
			class="input-field"
			placeholder="Preguntame sobre Europa..."
			bind:value={inputText}
			on:keydown={handleKeydown}
			rows="1"
		></textarea>
		<button class="send-button" on:click={() => sendMessage()} disabled={!inputText.trim()}>
			▶️
		</button>
	</div>
</div>