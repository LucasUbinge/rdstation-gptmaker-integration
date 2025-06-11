import externalApi from "../config/axios.js";
import ApiServiceError from "../errors/ApiServiceError.js";

const RD_CRM_WEBHOOKS_PATH = "/api/v1/webhooks";

export const create = async (data) => {
  try {
    const { data: result } = await externalApi.post(RD_CRM_WEBHOOKS_PATH, data);
    return result;
  } catch (error) {
    const errMsg = error.response?.data?.errors?.[0]?.error || error.message;
    // Lance nosso erro customizado, passando a mensagem e o status code da resposta original se existir
    throw new ApiServiceError(
      `Falha ao criar webhook na RD Station: ${errMsg}`,
      error.response?.status
    );
  }
};

// ... refatore findAll e deleteById da mesma forma ...

export const findAll = async () => {
  try {
    const { data: result } = await externalApi.get(RD_CRM_WEBHOOKS_PATH);
    return result;
  } catch (error) {
    const errMsg = error.response?.data?.errors?.[0]?.error || error.message;
    throw new ApiServiceError(
      `Falha ao listar webhooks na RD Station: ${errMsg}`,
      error.response?.status
    );
  }
};

export const deleteById = async (id) => {
  try {
    await externalApi.delete(`${RD_CRM_WEBHOOKS_PATH}/${id}`);
  } catch (error) {
    const errMsg = error.response?.data?.errors?.[0]?.error || error.message;
    throw new ApiServiceError(
      `Falha ao deletar webhook (ID: ${id}) na RD Station: ${errMsg}`,
      error.response?.status
    );
  }
};
