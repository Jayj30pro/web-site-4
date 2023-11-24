import yfinance as yf
from tkinter import *



root = Tk()
root.geometry('600x400')
root.title("Calculator")
result = Entry(root, width=500,)
result.place(x=100, y=200)
message = Label(root,text="Math is best when done at a desk!", font='arial 15 bold')
message.place(x=100, y=10)

#but1 = Button(root,text= 'Name', font= 'arial 12', bg='#5CA', command = genInfo).place(x=80, y=300)

root.mainloop()