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
import java.util.Locale;
import java.util.ResourceBundle;

@Controller
public class FileController {
    private static String default_path;
    static {
        ResourceBundle bundle = ResourceBundle.getBundle("path", Locale.US);
        default_path = bundle.getString("default.path");
    }

    @RequestMapping(value = "/filetree", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity fileTree(){
        try {
            String json = new ObjectMapper().writeValueAsString(TreeStructureCreator.walkTree(default_path));
            return new ResponseEntity<>(json, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/delete_node", method = RequestMethod.POST)
    public ResponseEntity deleteNode(@RequestParam("node_name") String node_name){
        Path rootPath = Paths.get(node_name);
        try {
            Files.walk(rootPath, FileVisitOption.FOLLOW_LINKS)
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        } catch (IOException e) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/create_node")
    public ResponseEntity createNode(@RequestParam("node_name") String node_name) {
        File new_folder = new File(node_name);
        if (!new_folder.exists()) {
            if (new_folder.mkdir()) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "/rename_node")
    public ResponseEntity renameNode(@RequestParam("from") String from, @RequestParam("to") String to) {
        File old_folder = new File(from);
        File new_folder = new File(to);
        if (!old_folder.exists() || new_folder.exists()){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else if (old_folder.renameTo(new_folder)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "/replace_node")
    public ResponseEntity replaceNode(@RequestParam("source") String source, @RequestParam("target") String target) {
        File source_path = new File(source);
        File target_path = new File(target);
        if (!source_path.exists()) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (source_path.renameTo(target_path)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
