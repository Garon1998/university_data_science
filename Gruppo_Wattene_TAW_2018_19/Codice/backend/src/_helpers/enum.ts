const FoodAndDrinkState = ["In coda", "In preparazione", "Pronto", "Servito"];
const enum foodCategory {
    Dessert = "Dessert",
    Antipasto = "Antipasto",
    PrimoPiatto = "Primo Piatto",
    SecondoPiatto = "Secondo Piatto",
    Contorno = "Contorno",
    Dolce = "Dolce"
}
const enum drinkCategory {
    Analcolico = "Analcolico",
    Alcolico = "Alcolico"
}
const enum ROLE {
    cassa = "cassa",
    cameriere = "cameriere",
    cuoco = "cuoco",
    barista = "barista"
}
const enum suborderstate {
    incoda = 'In coda',
    inpreparazione = 'In preparazione',
    pronto = 'Pronto',
    servito = 'Servito',
}
export { FoodAndDrinkState };
export { foodCategory };
export { drinkCategory };
export { ROLE };
export { suborderstate };