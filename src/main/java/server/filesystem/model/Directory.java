package server.filesystem.model;

import com.fasterxml.jackson.annotation.*;

import java.util.ArrayList;
import java.util.List;

@JsonPropertyOrder({"title", "isFolder", "children", "files"})
public class Directory {

    @JsonProperty("title")
    private String title;

    @JsonProperty("isFolder")
    private boolean isFolder;

    @JsonProperty("children")
    private List<Directory> children;

    @JsonProperty("files")
    private List<Item> files;

    @JsonIgnore
    private Directory parent;

    public Directory getParent() {
        return parent;
    }

    public void setParent(Directory parent) {
        this.parent = parent;
    }

    public Directory(String title) {
        this.title = title;
        this.isFolder = true;
        this.children = new ArrayList<>();
        this.files = new ArrayList<>();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @JsonGetter("isFolder")
    public boolean isFolder() {
        return isFolder;
    }

    @JsonSetter("isFolder")
    public void setFolder(boolean isFolder) {
        this.isFolder = isFolder;
    }

    public List<Directory> getChildren() {
        return children;
    }

    public void setChildren(List<Directory> children) {
        this.children = children;
    }

    public List<Item> getFiles() {
        return files;
    }

    public void setFiles(List<Item> files) {
        this.files = files;
    }
}
