import express, { Request, Response } from "express";

// Constants

const OK = 200;
const ERROR = 400;

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

interface recipeReturn {
  name: string;
  cookTime: number;
  ingredients: requiredItem[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook = new Map<string, ingredient | recipe>();

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  if (!recipeName.length) return null;

  const replaceChar = (str: string) => str.replace(/[-_]/g, ' ').replace(/[^a-zA-Z ]/g, '');
  const title = (str: string) => str.toLowerCase().split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').trim();
  
  recipeName = replaceChar(recipeName);
  recipeName = title(recipeName);
  recipeName = recipeName.trim();
  return recipeName.length ? recipeName : null;
}

// Helper function for task 2
const addCookbookEntry = (entry: cookbookEntry): {}  => {
  const hasDuplicateIngredients = (items: requiredItem[]): boolean => {
    const seen = new Set<string>();
    seen.add(entry.name);
    for (const item of items) {
      if (seen.has(item.name)) return true;
      seen.add(item.name);
    }

    return false;
  }
  
  if (cookbook.has(entry.name)) {
    throw new Error("entry names must be unique");
  }
  
  if (entry.type !== "ingredient" && entry.type !== "recipe") {
    throw new Error("type can only be recipe or ingredient");
  }

  if (entry.type === "ingredient") {
    const ingredientEntry = entry as ingredient;
    if (ingredientEntry.cookTime < 0) {
      throw new Error("cookTime can only be greater than or equal to 0");
    } else cookbook.set(entry.name, ingredientEntry);
  } 
  
  if (entry.type === "recipe") {
    const recipeEntry = entry as recipe;
    if (hasDuplicateIngredients(recipeEntry.requiredItems)) {
      throw new Error("Recipe requiredItems can only have one element per name");
    } else cookbook.set(entry.name, recipeEntry);
  }

  return {};
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const entry: cookbookEntry = req.body;
  try {
    res.json(addCookbookEntry(entry));
  } catch (error) {
    return res.status(ERROR).json({ error: error.message });
  }
});

// Helper function for task 3
const findRecipe = (name: string): recipeReturn => {
  const findCookTime = (ingredients: requiredItem): number => {
    if (!cookbook.has(ingredients.name)) throw new Error("The recipe contains recipes or ingredients that aren't in the cookbook.");
    
    const ingredientItem = cookbook.get(ingredients.name) as cookbookEntry;
    let cookTime = 0;
    if (ingredientItem.type === "ingredient") cookTime += (ingredientItem as ingredient).cookTime * ingredients.quantity;
    else {
      for (const item of (ingredientItem as recipe).requiredItems) {
          cookTime += findCookTime(item);
      }
    }
    return cookTime;
  };

  if (!cookbook.has(name)) throw new Error("A recipe with the corresponding name cannot be found");
  
  const recipeName = cookbook.get(name) as cookbookEntry;
  if (recipeName.type !== "recipe") throw new Error("The searched name is NOT a recipe name (ie. an ingredient)");

  const recipeItems: requiredItem[] = (recipeName as recipe).requiredItems;

  let cookTime = 0;
  for (const ingredients of recipeItems) {
      cookTime += findCookTime(ingredients);
  }
  
  return {
    name: recipeName.name,
    cookTime: cookTime,
    ingredients: recipeItems
  };
}

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  try {
    res.json(findRecipe(req.query.name));
  } catch (error) {
    return res.status(ERROR).json({ error: error.message });
  }
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
