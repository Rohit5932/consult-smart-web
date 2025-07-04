
export const createWhatsAppLink = (phone: string, message: string) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const openWhatsAppChat = (phone: string, message: string) => {
  const whatsappUrl = createWhatsAppLink(phone, message);
  window.open(whatsappUrl, '_blank');
};

export const getDefaultWhatsAppMessage = (service?: string) => {
  const baseMessage = "Hi, I would like to inquire about your tax consulting services.";
  return service ? `${baseMessage} Specifically interested in ${service}.` : baseMessage;
};
