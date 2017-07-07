package server.filesystem;

import java.io.IOException;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class FileWalker {

    public List<String> walkTree(String startPath) {
        Path start = Paths.get(startPath);
        List<String> l = new ArrayList<>();
        try {
            EnumSet<FileVisitOption> opts = EnumSet.noneOf(FileVisitOption.class);
            Files.walkFileTree(start, opts, 3, new MyFileVisitor(l));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return l;
    }

}