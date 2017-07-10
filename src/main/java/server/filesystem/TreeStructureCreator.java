package server.filesystem;

import server.filesystem.model.Directory;
import server.filesystem.model.Item;

import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.Instant;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class TreeStructureCreator {

    public static List<Directory> walkTree(String startPath) {
        Path start = Paths.get(startPath);
        List<Directory> dirs = new ArrayList<>();
        try {
            EnumSet<FileVisitOption> opts = EnumSet.noneOf(FileVisitOption.class);
            Files.walkFileTree(start, opts, Integer.MAX_VALUE, new FileWalker(dirs));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return dirs;
    }

    private static class FileWalker extends SimpleFileVisitor<Path> {
        private List<Directory> result = null;
        private Directory cur_dir = null;

        private FileWalker(List<Directory> result) {
            super();
            this.result = result;
        }

        @Override
        public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
            if (cur_dir == null) {
                Directory new_dir = new Directory(dir.toString());
                cur_dir = new_dir;
                result.add(new_dir);
            }
            else {
                Directory new_dir = new Directory(dir.getFileName().toString());
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
                String file_name = file.getFileName().toString();
                Instant lastAccessTime = attrs.lastAccessTime().toInstant();
                Instant lastModifiedTime = attrs.lastModifiedTime().toInstant();
                Item item = new Item(file_name, lastAccessTime, lastModifiedTime, attrs.size());
                cur_dir.getFiles().add(item);
            }
            return FileVisitResult.CONTINUE;
        }

        @Override
        public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
            return FileVisitResult.SKIP_SUBTREE;
        }
    }
}
