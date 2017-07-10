package server.filesystem.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

@JsonPropertyOrder({"itemName", "lastAccessTime", "lastModifiedTime", "size"})
public class Item {

    @JsonProperty("itemName")
    private String itemName;

    @JsonProperty("lastAccessTime")
    private String lastAccessTime;

    @JsonProperty("lastModifiedTime")
    private String lastModifiedTime;

    @JsonProperty("size")
    private long size;

    public Item(String itemName, Instant lastAccessTime, Instant lastModifiedTime, long size) {
        DateTimeFormatter formatter =
                DateTimeFormatter.ofLocalizedDateTime( FormatStyle.SHORT )
                        .withLocale( Locale.UK )
                        .withZone( ZoneId.systemDefault() );
        this.itemName = itemName;
        this.lastAccessTime = formatter.format(lastAccessTime);
        this.lastModifiedTime = formatter.format(lastModifiedTime);
        this.size = size;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getLastAccessTime() {
        return lastAccessTime;
    }

    public void setLastAccessTime(String lastAccessTime) {
        this.lastAccessTime = lastAccessTime;
    }

    public String getLastModifiedTime() {
        return lastModifiedTime;
    }

    public void setLastModifiedTime(String lastModifiedTime) {
        this.lastModifiedTime = lastModifiedTime;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
