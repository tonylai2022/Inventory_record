import IInventoryItem from "../inventory/IInventoryItem";

export default function createCSV(inventoryItems: IInventoryItem[]): string{
    let resultString = "asin,stock,price";
    for (const item of inventoryItems){
        resultString += "\n";
        resultString += `${item.asin},${item.stock},${item.price}`;
    }
    return resultString;
}