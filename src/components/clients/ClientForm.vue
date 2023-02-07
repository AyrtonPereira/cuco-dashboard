<script setup>
import { onMounted, reactive, inject } from "vue";
import BaseInput from "../form/BaseInput.vue";
import BaseButton from "../form/BaseButton.vue";
import { useRoute, useRouter } from "vue-router";
import yup from "@/utils/Yup.js";
import { Form, ErrorMessage } from "vee-validate";

const route = useRoute();
const router = useRouter();
const notifyError = inject("notifyError");
const emit = defineEmits(["update:clientData"]);

const props = defineProps({
  client: { type: Object },
  saving: { type: Boolean, default: false },
});

const state = reactive({
  clientInformation: {
    cpf: "",
    birthdate: "",
    name: "",
    phone: "",
  },
  validationSchema: {
    name: yup.string().required(),
    cpf: yup.string().required().min(3),
    birthdate: yup
      .date()
      .typeError("Escolha um formato de data válido")
      .required(),
    phone: yup.string(),
  },
});

onMounted(() => {
  if (isUpdate && props.client?.id) {
    state.clientInformation = { ...props.client };
  }
});

const isUpdate = route.name == "app.clientUpdate";

const validateDocument = (value) => {
  if (!value || !value.length) {
    return true;
  }
  const cpf = value.replace(/\D/g, "");
  let Soma;
  let Resto;
  Soma = 0;
  if (cpf == "00000000000") {
    return "Digite um CPF ou CNPJ válido";
  }

  if (cpf.length === 8 || cpf.length === 14) {
    return true;
  }

  for (let i = 1; i <= 9; i++)
    Soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) {
    return "Digite um CPF ou CNPJ válido";
  }
  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;
  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) {
    return "Digite um CPF ou CNPJ válido";
  }
  return true;
};

const onSubmit = async () => {
  const validDocument = validateDocument(state.clientInformation.cpf);
  if (validDocument != true) return notifyError(validDocument);
  emit("update:clientData", state.clientInformation);
};
</script>
<template>
  <div class="cuco-client-form-component flex flex-col">
    <Form @submit="onSubmit" :validation-schema="state.validationSchema">
      <div class="flex flex-col md:flex-row md:mb-6">
        <div class="w-full md:w-1/2 flex flex-col mb-3 md:mr-2">
          <span class="sr-only" label-for="clientName">Nome do cliente</span>
          <BaseInput
            id="clientName"
            v-model="state.clientInformation.name"
            placeholder="Nome"
            name="name"
          />
          <ErrorMessage name="name" class="text-red-600 text-xs" />
        </div>
        <div class="w-full flex flex-col md:w-1/2 mb-3 md:ml-2">
          <span class="sr-only" label-for="clientDocument">CPF do cliente</span>
          <BaseInput
            id="clientDocument"
            v-model="state.clientInformation.cpf"
            placeholder="CPF"
            name="cpf"
          />
          <ErrorMessage name="cpf" class="text-red-600 text-xs" />
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:mb-6">
        <div class="flex w-full flex-col md:w-1/2 mb-2 md:mr-2">
          <span class="sr-only" label-for="clientBirthdate"
            >Data de nascimento do cliente</span
          >
          <BaseInput
            id="clientBirthdate"
            type="date"
            v-model="state.clientInformation.birthdate"
            placeholder="Data de Nascimento"
            name="birthdate"
          />
          <ErrorMessage name="birthdate" class="text-red-600 text-xs" />
        </div>
        <div class="flex w-full flex-col md:w-1/2 mb-3 md:ml-2">
          <span class="sr-only" label-for="clientPhone">
            Telefone do cliente
          </span>
          <BaseInput
            id="clientPhone"
            v-model="state.clientInformation.phone"
            placeholder="Telefone"
            name="phone"
          />
          <ErrorMessage name="phone" class="text-red-600 text-xs" />
        </div>
      </div>
      <div class="flex justify-between md:justify-end w-full self-end">
        <BaseButton
          class="px-10"
          variation="secondary"
          label="Cancelar"
          @click="router.push({ name: 'app.clients' })"
          :blocked="saving"
          type="button"
        />
        <BaseButton
          class="px-10"
          type="submit"
          label="Salvar"
          :loading="saving"
        />
      </div>
    </Form>
  </div>
</template>
