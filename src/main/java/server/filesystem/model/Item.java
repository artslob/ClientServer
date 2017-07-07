package server.filesystem.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class Item {

    @JsonProperty("itemName")
    private String itemName;

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Item(String itemName) {
        this.itemName = itemName;
    }
}
