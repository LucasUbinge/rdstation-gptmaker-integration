import externalApi from "./axios.js";

const RD_CRM_WEBHOOKS_PATH = "/api/v1/webhooks";

export const create = async (data) => {
  try {
    const { data: result } = await externalApi.post(RD_CRM_WEBHOOKS_PATH, data);
    return result;
  } catch (error) {
    handleError("criar", error);
  }
};

export const findAll = async () => {
  try {
    const { data: result } = await externalApi.get(RD_CRM_WEBHOOKS_PATH);
    return result;
  } catch (error) {
    handleError("listar", error);
  }
};

/**
 * @param {string} id - O ID do webhook a ser deletado.
 */
export const deleteById = async (id) => {
  try {
    await externalApi.delete(`${RD_CRM_WEBHOOKS_PATH}/${id}`);
  } catch (error) {
    handleError(`deletar (ID: ${id})`, error);
  }
};

const handleError = (acao, error) => {
  const errMsg = error.response?.data?.errors?.[0]?.error || error.message;
  console.error(`Erro ao ${acao} webhook:`, errMsg);
  throw new Error(`Falha ao ${acao} webhook na RD Station: ${errMsg}`);
};
