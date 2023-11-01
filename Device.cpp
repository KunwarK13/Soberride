//This is the code that the Arduino ran on

#include <Arduino.h>

int LED1 = 10; //red led
int LED2 = 11; //green led
int LED3 = 9; //yellow led

int MQ3D = 2; //digital
int MQ3A = 0; //analog

void setup(){
    Serial.begin(9600);
    pinMode(LED1, OUTPUT);
    pinMode(LED2, OUTPUT);
    pinMode(LED3, OUTPUT);
    pinMode(MQ3D, INPUT);

    delay(5000);
}

void loop(){
    bool digital = digitalRead(MQ3D);
    float analogValue = analogRead(MQ3A);

    if(analogValue>380 && analogValue<500){ //alcohol detected but not an actual drink (yellow)
        digitalWrite(LED3, HIGH);
        digitalWrite(LED1, LOW);
        digitalWrite(LED2, LOW);
    } else if(analogValue >= 500){ //drunk (red)
        digitalWrite(LED1, HIGH);
        digitalWrite(LED2, LOW);
        digitalWrite(LED3, LOW);
    } else{ //sober (green)
        digitalWrite(LED2, HIGH);
        digitalWrite(LED1, LOW);
        digitalWrite(LED3, LOW);
    }
    Serial.println(analogValue);
    delay(1000);
}