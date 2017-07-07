package server.filesystem;

import java.nio.file.FileVisitor;

public interface IWalker<T, R, E> extends FileVisitor<T> {
    R getResult(E obj);
}
