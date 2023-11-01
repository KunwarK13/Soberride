#This is the code for our AI model. This code has everything including how we preprocessed our data.

from keras.callbacks import ReduceLROnPlateau
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from imblearn.over_sampling import RandomOverSampler
from sklearn.metrics import accuracy_score

from keras.callbacks import ReduceLROnPlateau

def categorical_to_numpy(labels_in):
  labels = []
  for label in labels_in:
    if label == 0:
      labels.append(np.array([1, 0]))
    else:
      labels.append(np.array([0, 1]))
  return np.array(labels)

df = pd.read_csv("/content/BigML_Dataset_64dfe6db7411b4118e15ad24.csv")

df = pd.read_csv("/content/BigMLDatasetLarge.csv")

df.Gender[df.Gender == 'Male'] = 1
df.Gender[df.Gender == 'Female'] = 2
df.Gender[df.Gender == 'Unknown'] = 3

t=-1
for i in df.Gender:
  t+=1
  if i!=1 and i!=2 and i!=3:
      df.Gender[t]=4

df.Month[df.Month == 'Jan'] = 1 #Data preprocessing
df.Month[df.Month == 'Feb'] = 2
df.Month[df.Month == 'Mar'] = 3
df.Month[df.Month == 'Apr'] = 4
df.Month[df.Month == 'May'] = 5
df.Month[df.Month == 'Jun'] = 6
df.Month[df.Month == 'Jul'] = 7
df.Month[df.Month == 'Aug'] = 8
df.Month[df.Month == 'Sep'] = 9
df.Month[df.Month == 'Oct'] = 10
df.Month[df.Month == 'Nov'] = 11
df.Month[df.Month == 'Dec'] = 12

df.WeekType[df.WeekType == 'Weekend'] = 1
df.WeekType[df.WeekType == 'Weekday'] = 2
df.WeekType[df.WeekType == 'unknown'] = 3

df.TimeBand[df.TimeBand == '12am-4am'] = 1
df.TimeBand[df.TimeBand == '4am-8am'] = 2
df.TimeBand[df.TimeBand == '8am-12pm'] = 3
df.TimeBand[df.TimeBand == '12pm-4pm'] = 4
df.TimeBand[df.TimeBand == '4pm-8pm'] = 5
df.TimeBand[df.TimeBand == '8pm-12pm'] = 6
df.TimeBand[df.TimeBand == 'unknown'] = 7

df.AgeBand[df.AgeBand == '16-19'] = 1
df.AgeBand[df.AgeBand == '20-24'] = 2
df.AgeBand[df.AgeBand == '25-29'] = 3
df.AgeBand[df.AgeBand == '30-39'] = 4
df.AgeBand[df.AgeBand == '40-49'] = 5
df.AgeBand[df.AgeBand == '50-59'] = 6
df.AgeBand[df.AgeBand == '60-69'] = 7
df.AgeBand[df.AgeBand == '70-98'] = 8
df.AgeBand[df.AgeBand == 'Other'] = 9

cols = {'Month': 'Month',
        'WeekType': 'WeekType',
        'TimeBand': 'TimeBand',
        'BreathAlcoholLevel(microg/100ml)':'BreathAlcoholLevel',
        'AgeBand':'AgeBand',
        'Gender':'Gender'}

df.rename(columns=cols,
          inplace=True)

df.BreathAlcoholLevel[df.BreathAlcoholLevel > 0] = 1

counter=0
for a in range(0, 558300):
  i = df.loc[a, 'BreathAlcoholLevel']
  if i==1:
    #df.loc[len(df.index), (len(df.index)+1)] = df.loc[a].copy()
    row_to_duplicate = df.iloc[a]
    df = df.append(row_to_duplicate, ignore_index=True)
    df = df.append(row_to_duplicate, ignore_index=True)
    counter+=1
print(counter)

X=X.astype(float)

X_train, X_temp, y_train, y_temp = train_test_split(X,y,test_size=0.4,random_state=0)
X_valid, X_test, y_valid, y_test = train_test_split(X_temp,y_temp,test_size=0.5,random_state=0)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(5,)),  # Input layer with 5 features

    tf.keras.layers.Dense(256, activation='relu'),  # Hidden layer with 256 neurons
    tf.keras.layers.BatchNormalization(),           # Batch normalization
    tf.keras.layers.Dropout(0.5),                   # Dropout for regularization

    tf.keras.layers.Dense(128, activation='relu'),  # Hidden layer with 128 neurons
    tf.keras.layers.BatchNormalization(),           # Batch normalization
    tf.keras.layers.Dropout(0.3),                   # Dropout for regularization

    tf.keras.layers.Dense(64, activation='relu'),   # Hidden layer with 64 neurons
    tf.keras.layers.BatchNormalization(),           # Batch normalization

    tf.keras.layers.Dense(1, activation='sigmoid')  # Output layer with sigmoid activation for binary classification
])

model.compile(optimizer='adam',
              loss=tf.keras.losses.BinaryCrossentropy(),
              metrics=['accuracy'])

reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.2,
                              patience=2, min_lr=0.0001, min_delta=0.01)

model.fit(X_train, y_train, epochs=4, batch_size = 64, validation_data=(X_valid, y_valid), callbacks=[reduce_lr])
y_pred = model.predict(X_test)
c=0
maxP = 0
maxT = 0
for i in y_pred:
  if i[0] >= 0.5:
    #print(X_test[c])
    #print(i[0])

    if i[0]>maxP:
      maxP=i[0]
      maxT = X_test[c]
    c+=1
    #break
#print(c)
print(maxP)
print(maxT)
threshold = 0.5
y_pred_labels = (y_pred > threshold).astype(int)
#print(y_pred)
#print(X_test[0])
#print(y_pred_labels[0])
accuracy = accuracy_score(y_test, y_pred_labels)
print("Accuracy:", accuracy)

def getPred(a,b,c,d,e):
  X_pred = [[a,b,c,d,e]]
  yp = model.predict(X_pred)
  return yp[0][0]
print(getPred(7,2,6,3,1))