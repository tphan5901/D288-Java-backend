package com.example.demo.bootstrap;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dao.DivisionRepository;
import com.example.demo.entities.Customer;
import com.example.demo.entities.Division;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BootStrapData implements CommandLineRunner {
    private final CustomerRepository customerRepository;
    private final DivisionRepository divisionRepository;

    public BootStrapData(CustomerRepository customerRepository, DivisionRepository divisionRepository) {
        this.customerRepository = customerRepository;
        this.divisionRepository = divisionRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        Customer one = new Customer();
        one.setFirstName("Ken");
        one.setLastName("ne");
        one.setPostal_code("9090");
        one.setAddress("45 ln");

        Customer two = new Customer();
        two.setFirstName("Ri");
        two.setLastName("mi");
        two.setPhone("998");
        two.setPostal_code("9098");
        two.setAddress("43 ln");

        Customer three = new Customer();
        three.setFirstName("ma");
        three.setLastName("ma");
        three.setPhone("23423");
        three.setPostal_code("124");
        three.setAddress("49 ln");
        customerRepository.save(three);

        Customer mel = new Customer();
        mel.setFirstName("Mel");
        mel.setLastName("fay");
        mel.setPhone("523");
        mel.setPostal_code("52351");
        mel.setAddress("41 ln");

        Customer five = new Customer();
        five.setFirstName("fun");
        five.setLastName("Yun");
        five.setPhone("2523");
        five.setPostal_code("92495");
        five.setAddress("40 ln");

        customerRepository.save(one);
        customerRepository.save(two);
        customerRepository.save(three);
        customerRepository.save(mel);
        customerRepository.save(five);

        System.out.println("Customer count: " + customerRepository.count());

    }

}
