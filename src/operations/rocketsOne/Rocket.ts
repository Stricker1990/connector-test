export default interface Rocket {
    id: string,
    company: string,
    country: string,
    main_image: string,
    cost_per_launch: {
        amount: number,
        currency: string
    }
}