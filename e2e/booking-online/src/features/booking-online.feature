Feature: Booking online

  Scenario: Booking online for the new customer
    Given I navigate to the booking-online homepage
    Then I should see the page title
    And The page should be loaded successfully
    And I should see the text "Booking Appointment" visible
    And I should see the text "PINK NAILS" visible
    And I should see the text "(090) 123-4567" visible
    And I should see the text "Booking Date" visible
    And I should see the date default to today

    When I click to select service
    Then I should see a popup dialog with title "Select Service"
    And I should see the categories displayed correctly

    When I click on the "MANI & PEDI" text inside the content section of the opening dialog
    And I click on the "Manicure" text inside the content section of the opening dialog
    Then I should see the selected service "Manicure - 20 mins"

    When I click to select technician
    Then I should see a popup dialog with title "Select Technician"
    And I should see the technicians displayed correctly

    When I click on the "Any Technician" text inside the content section of the opening dialog
    Then I should see the selected technician "Any Technician"

    When I click to add notes
    And I enter a note "Lorem Ipsum"

    When I select the next date

    When I click on the "Next Step" button
    And I wait for the page fully loaded
    Then I should see the text "Morning" visible

    When I select the time slot "02:00 AM"
    And I click on the "Continue" button
    And I wait for the page fully loaded
    Then I should see the text "How do we say hello?" visible

    When I fill the new customer phone
    And I wait for the page fully loaded
    And I enable google Captcha
    And I wait for the page fully loaded
    And I fill the new customer name "Booking-online"
    And I click on the "Submit" button
    And I wait for the page fully loaded

    Then I should see the text "Your appointment has been sent to the " visible
    And I should see the booked for next day
    And I should see the text "Manicure" visible
    And I should see the text "Any Technician" visible
    And I should see the booked appointment at "02:00 AM"
    And I should see the text "If you have any changes or questions, please feel free to contact us." visible







