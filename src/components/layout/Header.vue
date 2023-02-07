<template>
  <div class="">
    <Disclosure as="nav" v-slot="{ open }">
      <div>
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link :to="{ name: 'app.clients' }">
                <img
                  src="@/assets/cuco-logo.svg"
                  alt="Logo do aplicativo Cuco"
                />
              </router-link>
            </div>
          </div>
          <div v-if="isDashboard" class="hidden sm:block">
            <div class="ml-4 flex items-center md:ml-6">
              <router-link :to="{ name: 'app.newClient' }">
                <BaseButton variation="danger">Novo Cliente</BaseButton>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import BaseButton from "@/components/form/BaseButton.vue";
const route = useRoute();
const isDashboard = computed(() => route.name == "app.clients");

const navigation = [{ name: "Dashboard", href: "/", current: true }];
</script>
