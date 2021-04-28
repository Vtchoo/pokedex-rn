interface Ability {
	name: string
	url: string
}

interface Form {
	name: string
	url: string
}

interface Type {
	name: string
	url: string
}

interface Pokemon {
	id: number
	is_default: boolean
	name: string
	
	abilities: { ability: Ability, is_hidden: boolean, slot: number }[]
	base_experience: number
	forms: Form[]

	height: number
	held_items: any[]

	sprites: {
		back_default: string
		back_female?: string
		back_shiny: string
		back_shiny_female?: string
		front_default: string
		front_female?: string
		front_shiny: string
		front_shiny_female?: string
	}

	types: { type: Type, slot: number }[]

	weight: number
}

export type { Pokemon }