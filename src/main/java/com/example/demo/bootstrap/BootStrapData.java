package com.example.demo.bootstrap;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dao.DivisionRepository;
import com.example.demo.entities.Customer;
import com.example.demo.entities.Division;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BootStrapData implements CommandLineRunner {

    public BootStrapData(CustomerRepository customerRepository, DivisionRepository divisionRepository) {
    }

    @Override
    public void run(String... args) throws Exception {
/*

        Customer one = new Customer();
        one.setFirstName("Ken");
        one.setLastName("Doll");
        one.setPhone("999");
        one.setPostal_code("9090");
        one.setAddress("45 ln");
        one.setDivisions(az);
        divisionRepository.save(az);
        customerRepository.save(one);

        Customer two = new Customer();
        two.setFirstName("Rick");
        two.setLastName("Man");
        two.setPhone("998");
        two.setPostal_code("9098");
        two.setAddress("43 ln");
        two.setDivisions(az);
        divisionRepository.save(az);
        customerRepository.save(two);

        Customer three = new Customer();
        three.setFirstName("Sam");
        three.setLastName("Well");
        three.setPhone("994");
        three.setPostal_code("9094");
        three.setAddress("49 ln");
        three.setDivisions(az);
        divisionRepository.save(az);
        customerRepository.save three);

        Customer mel = new Customer();
        mel.setFirstName("Mel");
        mel.setLastName("fay");
        mel.setPhone("991");
        mel.setPostal_code("9091");
        mel.setAddress("41 ln");
        mel.setDivisions(az);
        divisionRepository.save(az);
        customerRepository.save(mel);

        Customer five = new Customer();
        five.setFirstName("Tia");
        five.setLastName("Yun");
        five.setPhone("9932");
        five.setPostal_code("9532");
        five.setAddress("40 ln");
        five.setDivisions(az);
        divisionRepository.save(az);
        customerRepository.save(five);

        System.out.println("Number of customers: " + customerRepository.count());

 */
    }

}
