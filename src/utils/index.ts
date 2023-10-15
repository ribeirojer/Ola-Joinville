// import { CheckoutData } from "../interfaces/Product";

export function createSlug(title: string): string {
  // Remove espaços em branco no início e no final do título
  let slug = title
    .normalize("NFD") // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove combinações de caracteres acentuados
    .toLowerCase(); // Converte para letras minúsculas

  // Substitui espaços em branco e caracteres especiais por hífen
  slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return slug;
}

export function extractImageSrcFromHTML(htmlString: string): string {
  // Expressão regular para capturar o atributo src da tag img
  const regex = /<img.*?src=['"](.*?)['"]/;
  const match = htmlString.match(regex);

  if (match) {
    return match[1];
  } else {
    return "";
  }
}

export function formatDateTime(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function countOccurrences(arr: number[]) {
  const counts: number[] = [];
  const total = arr.length;

  for (let i = 0; i < total; i++) {
    const num = arr[i];
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }

  for (let i = 0; i <= 5; i++) {
    if (!counts[i]) {
      counts[i] = 0;
    } else {
      counts[i] = (counts[i] / total) * 100;
    }
  }

  return counts;
}

export function fillStars(rating: number, index: number): "fill" | "regular" {
  if (index < rating) {
    return "fill";
  } else {
    return "regular";
  }
}

export function maskPhone(value: string) {
  value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
  value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quarto e o quinto dígitos
  return value;
}

export function validateCheckoutData(data: any): any {
  const errors = {
    firstName: false,
    lastName: false,
    email: false,
    emailRegex: false,
    zipCode: false,
    zipRegex: false,
    logradouro: false,
    numberAddress: false,
    complemento: false,
    bairro: false,
    city: false,
    state: false,
    tel: false,
    paymentMethod: false,
    termsAgreed: false,
    createAccount: false,
    password: false,
    confirmPassword: false,
  };

  if (!data.firstName) {
    errors.firstName = true;
  }
  if (!data.lastName) {
    errors.lastName = true;
  }
  if (!data.email) {
    errors.email = true;
  }
  if (!data.zipCode) {
    errors.zipCode = true;
  }
  if (!data.logradouro) {
    errors.logradouro = true;
  }
  if (!data.city) {
    errors.city = true;
  }
  if (!data.state) {
    errors.state = true;
  }
  if (!data.numberAddress) {
    errors.numberAddress = true;
  }
  if (!data.bairro) {
    errors.bairro = true;
  }
  if (!data.tel) {
    errors.tel = true;
  }
  if (!data.paymentMethod) {
    errors.paymentMethod = true;
  }
  if (!data.termsAgreed) {
    errors.termsAgreed = true;
  }
  if (data.createAccount) {
    if (!data.password) {
      errors.password = true;
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = true;
    }
  }

  // Valida o formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.emailRegex = true;
  }

  // Valida o formato do CEP
  const zipRegex = /^\d{5}-?\d{3}$/;
  if (!zipRegex.test(data.zipCode)) {
    errors.zipRegex = true;
  }

  return errors;
}

export function hasTrueFields(obj: any) {
  for (let key in obj) {
    if (obj[key] === true) {
      return true;
    }
  }
  return false;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Função para decodificar entidades HTML
export function decodeEntities(texto: string): string {
  const elemento = document.createElement("div");
  elemento.innerHTML = texto;
  return elemento.textContent || "";
}

// Função para remover tags HTML e atributos perigosos
export function sanitizeHTML(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function limitarDescricao(descricao: string, limite: number): string {
  if (descricao.length > limite) {
    // Se a descrição for maior que o limite, truncá-la e adicionar "..."
    return descricao.substring(0, limite) + "...";
  }
  // Caso contrário, retornar a descrição original
  return descricao;
}

export function traduzirCor(corEmIngles: string): string {
  const cores: { [key: string]: string } = {
    black: "preto",
    white: "branco",
    red: "vermelho",
    blue: "azul",
    green: "verde",
    // Adicione outras traduções de cores conforme necessário
  };

  // Verifica se a cor em inglês está no objeto de tradução
  if (corEmIngles.toLowerCase() in cores) {
    return cores[corEmIngles.toLowerCase()];
  } else {
    // Se a cor não estiver no objeto de tradução, retorna a cor original
    return corEmIngles;
  }
}

export function primeiraLetraMaiuscula(texto: string): string {
  // Verifica se a entrada é uma string válida
  if (typeof texto !== "string" || texto.length === 0) {
    return texto;
  }

  // Transforma a primeira letra em maiúscula e concatena com o restante da string
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
export const zipRegex = /^\d{5}-?\d{3}$/;
