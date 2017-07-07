package server.filesystem;

import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;

public class MyFileVisitor extends SimpleFileVisitor<Path> {
    private List<String> result = null;

    public MyFileVisitor(List<String> result) {
        super();
        this.result = result;
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        result.add(dir.toString());
        return FileVisitResult.CONTINUE;
    }

    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
        if (attrs.isDirectory())
            result.add(file.toString());
        return FileVisitResult.CONTINUE;
    }
}
