const extractTicketTypes = (body) => {
    const ticketTypes = [];
    let i = 0;
    while (body[`ticketTypes[${i}][name]`] !== undefined){
        ticketTypes.push({
            id: body[`ticketTypes[${i}][id]`], 
            name: body[`ticketTypes[${i}][name]`],
            price: body[`ticketTypes[${i}][price]`],
            capacity: body[`ticketTypes[${i}][capacity]`]
        });
        i++;
    }
    return ticketTypes;
};

const extractTicketTypesBooking = (body) => {
    const ticketTypes = [];
    let i = 0;
    while (body[`items[${i}][ticketTypeId]`] !== undefined){
        ticketTypes.push({
            ticketTypeId: body[`items[${i}][ticketTypeId]`],
            quantity: body[`items[${i}][qty]`]
        });
        i++;
    }
    return ticketTypes
}

module.exports = {extractTicketTypes, extractTicketTypesBooking}