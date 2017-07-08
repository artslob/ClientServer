package server.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import server.filesystem.TreeStructureCreator;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;

@Controller
public class FileController {

    @RequestMapping(value = "/filetree", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity fileTree(){
        try {
            String json = new ObjectMapper().writeValueAsString(TreeStructureCreator.walkTree("D:\\test"));
            System.out.println(json);
            return new ResponseEntity<>(json, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/delete_node", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity deleteNode(@RequestParam("node_name") String node_name){
        System.out.println(node_name);
        Path rootPath = Paths.get(node_name);
        try {
            Files.walk(rootPath, FileVisitOption.FOLLOW_LINKS)
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .peek(System.out::println)
                    .forEach(File::delete);
        } catch (IOException e) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
