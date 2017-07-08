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
            return new ResponseEntity<>("JsonException", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/delete_node", method = RequestMethod.POST)
    public ResponseEntity deleteNode(@RequestParam("node_name") String node_name){
        System.out.println(node_name);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
