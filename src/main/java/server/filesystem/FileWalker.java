package server.filesystem;

import server.filesystem.model.Directory;

import java.io.IOException;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class FileWalker {

    public List<Directory> walkTree(String startPath) {
        Path start = Paths.get(startPath);
        List<Directory> dirs = new ArrayList<>();
        try {
            EnumSet<FileVisitOption> opts = EnumSet.noneOf(FileVisitOption.class);
            Files.walkFileTree(start, opts, Integer.MAX_VALUE, new MyFileVisitor(dirs));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return dirs;
    }

}