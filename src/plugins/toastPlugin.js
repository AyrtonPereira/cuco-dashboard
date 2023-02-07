import { useToast } from "vue-toastification";

const toastPlugin = {
  install: (app, options) => {
    const toast = useToast();
    function notifySuccess(message) {
      toast.success(message);
    }
    function notifyError(message) {
      toast.error(message);
    }
    function notifyWarning(message) {
      toast.warning(message);
    }
    app.provide("notifySuccess", notifySuccess);
    app.provide("notifyError", notifyError);
    app.provide("notifyWarning", notifyWarning);
  },
};

export default toastPlugin;
