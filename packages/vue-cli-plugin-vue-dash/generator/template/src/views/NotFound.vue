<template>
	<ErrorPage
		<% if (i18n) { %>:code="$t('views.notFound.code')"
		:title="$t('views.notFound.error')"
		:message="$t('views.notFound.message')"
		:cta="$t('views.notFound.cta')"<% } else { %>code="404"
		title="Page non trouvée"
		message="Il semblerait qu'il y ait eu une erreur !"
		cta="Retour à la page d'accueil"<% } %>
	/>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';

	import { Meta } from '@/decorators';

	/** 404 page */
	@Component
	export default class NotFound extends Vue {
		/* istanbul ignore next */
		@Meta
		metaInfo() {
			return {
				title: <% if (i18n) { %>this.$t('views.notFound.meta.title')<% } else { %>'Erreur 404'<% } %>,
				meta: [
					{
						name: 'description',
						content: <% if (i18n) { %>this.$t('views.notFound.meta.description')<% } else { %>'Page non trouvée.'<% } %>
					}
				]
			};
		}
	}
</script>
