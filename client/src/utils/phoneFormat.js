// formats OpenBreweryDB string to US-styled phone number

export default function formatPhoneNumber(phoneNumber) {
    const areaCode = phoneNumber.substring(0, 3);
    const firstPart = phoneNumber.substring(3, 6);
    const secondPart = phoneNumber.substring(6, 10);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
};