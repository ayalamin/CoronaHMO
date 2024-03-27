using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Twitter;

internal class Rectangle : Tower
{
  
    public override void Print(string st, int outcome)
    {
        Console.WriteLine(st + outcome);
    }
    public void PrintScope(int length,int hight)
    {
        int scope = length * 2 + hight * 2;
        Print("The perimeter of the rectangle is: ", scope);
        //Console.WriteLine("The perimeter of the rectangle is: " + scope);
    }
    
    public void PrintSpace(int length ,int hight)
    {
        int space = length * hight;
        Print("The area of the rectangle is: ", space);
       // Console.WriteLine("The area of the rectangle is: " + space);
    }
}
