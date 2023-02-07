<script setup>
import BaseButton from "@/components/form/BaseButton.vue";
import { PencilIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  client: { type: Object, required: true },
});
const emit = defineEmits(["update:clientSelected"]);

const convertBirth = (date) => {
  const birth = new Date(props.client.birthdate);
  let day = birth.getDate();
  return `${day} de ${birth.toLocaleString("default", {
    month: "long",
  })} de ${birth.getFullYear()}`;
};

const clientSelected = (status) => {
  emit("update:clientSelected", { status, id: props.client.id });
};
</script>

<template>
  <div
    class="cuco-item bg-white rounded-lg my-2 flex flex-col md:flex-row items-center p-5"
  >
    <div class="w-16 self-start md:self-center mb-3 md:mb-0">
      <span class="sr-only">Selecionar</span
      ><input
        type="checkbox"
        :checked="client?.selected"
        @click="clientSelected($event.target.checked)"
      />
    </div>
    <div class="w-full md:w-2/6">
      <div class="flex md:flex-col">
        <div class="w-full flex justify-between">
          <span class="md:hidden">Nome</span>
          <span class="client-item-name font-bold">{{ client.name }}</span>
        </div>
        <span
          class="hidden md:block client-item-document font-semibold text-sm"
          >{{ client.cpf }}</span
        >
      </div>
      <div class="md:hidden flex md:flex-col">
        <div class="w-full flex justify-between">
          <span>CPF</span>
          <span class="client-item-document font-semibold text-sm">{{
            client.cpf
          }}</span>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/6">
      <div class="w-full flex justify-between">
        <span class="md:hidden">Nascimento</span>
        <span class="client-item-basic-style">{{
          convertBirth(client.birthdate)
        }}</span>
      </div>
    </div>
    <div class="w-full md:w-2/6">
      <div class="w-full flex justify-between">
        <span class="md:hidden">Telefone</span>
        <span class="client-item-basic-style">{{ client.phone }}</span>
      </div>
    </div>
    <div class="w-full md:w-1/6 flex mt-3 md:mt-0">
      <BaseButton
        class="w-full flex items-center md:w-auto"
        @click="
          router.push({ name: 'app.clientUpdate', params: { id: client.id } })
        "
        ><PencilIcon class="w-4 h-4 mr-2" />Editar</BaseButton
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cuco-item {
  font-family: "Poppins";
  color: #969cb3;
  .client-item-name {
    color: #363f5f;
  }
  .client-item-basic-style {
    font-weight: 400;
  }
}
</style>
