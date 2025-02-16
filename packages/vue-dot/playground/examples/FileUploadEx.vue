<template>
	<DocSection title="FileUpload">
		<h2 class="subtitle-1 mb-2 font-weight-bold">
			Default with event handlers
		</h2>

		<FileUpload
			ref="fileUpload"
			v-model="file"
			@error="setError"
			@change="error = null; success = true"
		/>

		<VLayout
			v-if="error"
			align-start
			column
		>
			<p class="mb-0 mt-1 error--text">
				{{ errorsText[error.code] || error }}
			</p>

			<VBtn
				class="mt-2"
				color="primary"
				@click="retry"
			>
				Réessayer
			</VBtn>
		</VLayout>

		<p
			v-else-if="success && file"
			class="mb-0 mt-1 success--text"
		>
			{{ file.name }}
		</p>

		<p
			v-else
			class="mb-0 mt-1 grey--text"
			:class="$vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-2'"
		>
			Aucun fichier sélectionné
		</p>

		<h2 class="subtitle-1 mt-4 mb-2 font-weight-bold">
			Translated
		</h2>

		<FileUpload
			:file-size-units="[
				'B',
				'kB',
				'MB',
				'GB',
				'TB'
			]"
		>
			<template #action-text="{ multiple }">
				Place your file{{ multiple ? 's' : '' }} here
			</template>

			<template #or>
				Or
			</template>

			<template #button-text>
				Choose a file
			</template>

			<template #info-text="{ maxSize, extensions }">
				(Max. size: {{ maxSize }}. Allowed formats: {{ extensions }})
			</template>
		</FileUpload>

		<h2 class="subtitle-1 mt-4 mb-2 font-weight-bold">
			Custom content & styles
		</h2>

		<FileUpload class="custom accent elevation-3">
			<template #placeholder>
				<VLayout align-center>
					<VIcon
						size="25"
						color="white"
						class="mr-4"
					>
						{{ uploadIcon }}
					</VIcon>

					<span class="white--text">
						Select or drop a file
					</span>
				</VLayout>
			</template>
		</FileUpload>
	</DocSection>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';

	import { Refs } from '../../src/types';

	import { mdiCloudUpload } from '@mdi/js';

	interface Error {
		code: string;
	}

	@Component
	export default class FileUploadEx extends Vue {
		// Extend $refs
		$refs!: Refs<{
			fileUpload: {
				retry: () => void;
			}
		}>;

		uploadIcon = mdiCloudUpload;

		error: Error | null = null;
		success = false;

		file: File | null = null;

		errorsText = {
			MULTIPLE_FILES_SELECTED: 'Vous ne pouvez sélectionner qu\'un seul fichier.',
			FILE_TOO_LARGE: 'Le fichier sélectionné est trop lourd.',
			FILE_EXTENSION_NOT_ALLOWED: 'L\'extension du fichier n\'est pas autorisée.'
		};

		/** Click on file input */
		retry() {
			this.$refs.fileUpload.retry();
		}

		setError(error: Error) {
			this.error = error;
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../src/tokens';

	$darken-accent: saturate(darken($vd-accent, 10%), 20%);

	.custom.file-upload {
		border: none;
		padding: 10px 15px !important;

		&:hover,
		&:focus {
			background: $darken-accent !important;
		}

		&.dragover {
			background: $darken-accent !important;
		}
	}
</style>
