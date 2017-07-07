package server.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import server.filesystem.FileWalker;
import server.filesystem.model.Directory;

import java.util.ArrayList;
import java.util.List;

@Controller
public class FileController {

    @RequestMapping(value = "/filetree", method = RequestMethod.GET)
    public ResponseEntity fileTree(){
        String s = "hello<br/>hello";
        FileWalker fw = new FileWalker();
//        return new ResponseEntity<List<String>>(fw.walkTree("D:\\test"), HttpStatus.OK);
//        return new ResponseEntity<String>("{\"Hello\" : \"hi\"}", HttpStatus.OK);
        List<Directory> dirs = new ArrayList<>();
        dirs.add(new Directory("dir1"));
        dirs.add(new Directory("dir2"));
        dirs.add(new Directory("dir3"));
        try {
            Directory dir = new Directory("dir");
            List<Directory> subdirs = new ArrayList<>();
            subdirs.add(new Directory("subdir1"));
            subdirs.add(new Directory("subdir2"));
            dir.setChildren(subdirs);
            String json = new ObjectMapper().writeValueAsString(new Directory[]{dir});
            System.out.println(json);
            return new ResponseEntity<String>(json, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("JsonException", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
