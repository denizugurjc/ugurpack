// data/cards.ts
import { Card } from "@/context/InventoryContext";

export const getRandomCard = async (): Promise<Card> => {
  const pokemonId = getRandomPokemonId();
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId);
  const descriptionRes = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/" + pokemonId
  );
  const data = await res.json();
  const description = await descriptionRes.json();

  const image = { uri: data.sprites.front_default };

  return {
    id: data.id.toString(),
    name: data.name,
    image,
    description: description.flavor_text_entries[0].flavor_text,
    rarity: getRarity(),
  };
};

const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 151) + 1;
};

const getRarity = () => {
  const random = Math.random();
  if (random < 0.2) return "Common";
  if (random < 0.4) return "Uncommon";
  if (random < 0.6) return "Rare";
  if (random < 0.8) return "Epic";
  if (random < 0.9) return "Legendary";
  if (random < 0.95) return "Mythic";
  return "Rare";
};
