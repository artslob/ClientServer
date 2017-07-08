package server.filesystem;

import server.filesystem.model.Directory;
import server.filesystem.model.Item;

import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;

public class MyFileVisitor extends SimpleFileVisitor<Path> {
    private List<Directory> result = null;
    private Directory cur_dir = null;
    int i = 0;

    public MyFileVisitor(List<Directory> result) {
        super();
        this.result = result;
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        Directory new_dir = new Directory(dir.getFileName().toString());
        if (cur_dir == null) {
            cur_dir = new_dir;
            result.add(new_dir);
        }
        else {
            new_dir.setParent(cur_dir);
            cur_dir.getChildren().add(new_dir);
            cur_dir = new_dir;
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
        cur_dir = cur_dir.getParent();
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
        if (attrs.isDirectory()) {
            Directory new_dir = new Directory(file.getFileName().toString());
            new_dir.setParent(cur_dir);
            cur_dir.getChildren().add(new_dir);
        }
        else if (attrs.isRegularFile()) {
            cur_dir.getFiles().add(new Item(file.getFileName().toString()));
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
        return FileVisitResult.SKIP_SUBTREE;
    }

//    @Override
//    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
//        result.add(new Directory(Integer.toString(i++) + " " + dir.toString()));
//        return FileVisitResult.CONTINUE;
//    }
//
//    @Override
//    public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
//        result.add(new Directory(Integer.toString(i++) + " " + dir.toString()));
//        return FileVisitResult.CONTINUE;
//    }
//
//    @Override
//    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
//        if (attrs.isDirectory())
//            result.add(new Directory(Integer.toString(i++) + " " + file.toString()));
//        else if (attrs.isRegularFile())
//            result.add(new Directory(Integer.toString(i++) + " " + file.getFileName().toString()));
//        return FileVisitResult.CONTINUE;
//    }
//
//    @Override
//    public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
//        return FileVisitResult.SKIP_SUBTREE;
//    }
}
