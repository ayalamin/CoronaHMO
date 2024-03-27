using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Twitter;

internal class Rectangle
{
    public void PrintScope(int length,int hight)
    {
        int scope = length * 2 + hight * 2;
        Console.WriteLine("The perimeter of the rectangle is: " + scope);
    }
    
    public void PrintSpace(int length ,int hight)
    {
        int space = length * hight;
        Console.WriteLine("The area of the rectangle is: " + space);
    }
}
