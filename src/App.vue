<template>
  <v-app>
    <v-main>
      <v-container :fluid="true">
        <v-row class="h-screen d-flex justify-center align-center">
          <v-col cols="10" md="6">
            <v-form @submit.prevent="onSubmit">
              <v-card :elevation="2" class="pa-4">
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
                  <v-btn type="submit" color="primary" variant="tonal">
                    Конвертировать
                  </v-btn>
                  <template v-if="url">
                    <v-btn :href="url" target="_blank" color="primary" variant="tonal">
                      Скачать файл
                    </v-btn>
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
import APIService from "@/services/APIService";
import SuccessResponseInterface from "@/interfaces/SuccessResponseInterface";
import ErrorResponseInterface from "@/interfaces/ErrorResponseInterface";

const required = ref<string>('')
const url = ref<string>('')

const file = ref<File>()

function uploadFile(event: any) {
  file.value = event.target.files[0]
}
function onSubmit() {
  if (file.value) {
    const formData = new FormData()
    formData.append('file', file.value)

    APIService.uploadPDF(formData)
      .then((response: SuccessResponseInterface) => {
        url.value = response.data.url
      })
      .catch((error: ErrorResponseInterface) => {
        console.log(error.message)
      })
  } else {
    required.value = 'Файл обязателен к загрузке'
  }

}
</script>
