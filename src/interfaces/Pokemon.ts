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
	weight: number

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

	order: number

	game_indices: {
		game_index: number,
		version: {
			name: string,
			url: string
		}
	}[]

	held_items: {
		item: {
			name: string,
			url: string
		},
		version_details: {
			rarity: number
			version: {
				name: string
				url: string
			}
		}[]
	}[]

	location_area_encounters: string

	moves: {
		move: {
			name: string
			url: string
		},
		version_group_details: {
			level_earned_at: number
			version_group: {
				name: string
				url: string
			},
			move_learn_method: {
				name: string
				url: string
			}
		}[]
	}[]
	
	species: {
		name: string
		url: string
	}

	stats: {
		base_stat: number
		effort: number
		stat: {
			name: string
			url: string
		}
	}[]
}

export type { Pokemon }