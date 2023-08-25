<template>
  <v-app>
    <v-main>
      <v-container :fluid="true" class="pa-0">
        <v-alert @click:close="onResponseError.status = false"
                 v-model="onResponseError.status"
                 position="absolute"
                 location="top"
                 :width="width"
                 :min-height="60"
                 :closable="true"
                 color="#C51162" density="comfortable" :rounded="0">
          {{ onResponseError.message }}
        </v-alert>
        <v-row class="h-screen d-flex justify-center align-center">
          <v-col cols="10" md="6">
            <v-form @submit.prevent="onSubmit">
              <v-card :elevation="2" class="pa-4" :loading="process">
                <v-card-title class="text-center">
                  Конвертер сканированных PDF в TXT
                </v-card-title>
                <v-card-subtitle class="text-center">
                  * диаграмы и таблицы не конвертируются
                </v-card-subtitle>
                <v-card-text>
                  <v-file-input density="compact"
                                :error-messages="required"
                                accept="application/pdf"
                                prepend-icon=""
                                prepend-inner-icon="mdi-paperclip"
                                variant="outlined"
                                @change="uploadFile"
                                label="Добавить файл"></v-file-input>
                </v-card-text>
                <v-card-actions class="d-flex justify-center flex-column align-center">
                  <template v-if="!url">
                    <v-btn type="submit" color="primary" :disabled="process">
                      Конвертировать
                    </v-btn>
                  </template>
                  <template v-if="url">
                    <a :href="url" download
                       class="text-green text-decoration-none">
                      Скачать файл
                    </a>
                  </template>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {useDisplay} from "vuetify"
import APIService from "@/services/APIService";
import SuccessResponseInterface from "@/interfaces/SuccessResponseInterface";
import ErrorResponseInterface from "@/interfaces/ErrorResponseInterface";

const required = ref<string>('')
const onResponseError = ref<ErrorAlertType>({
  status: false,
  message: ''
})
const process = ref<boolean>(false)
const url = ref<string>('')
const file = ref<File>()
const { width } = useDisplay()
function uploadFile(event: any) {
  file.value = event.target.files[0]
}
function onSubmit() {
  if (file.value) {
    const formData = new FormData()
    formData.append('file', file.value)

    process.value = true

    APIService.uploadPDF(formData)
      .then((response: SuccessResponseInterface) => {
        url.value = response.data.url
      })
      .then(() => process.value = false)
      .catch((error: ErrorResponseInterface) => {
        onResponseError.value.status = true
        onResponseError.value.message = error.response.data.message
      })
  } else {
    required.value = 'Файл обязателен к загрузке'
  }

}
</script>
