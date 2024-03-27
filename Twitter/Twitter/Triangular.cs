using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Twitter;

internal class Triangular : Tower
{
    public Triangular()
    {
    }
    public void PrintSpace(int length, int hight)
    {
        if (length == 1)
        {
            Console.Write("*");
            return;
        }
        if (length == 3)
        {
            for (int i = 0; i < hight - 1; i++)
            {
                Console.Write(" *");
                Console.WriteLine();
            }
            Console.Write("***");
            Console.WriteLine();
            return;
        }
        int result = (hight - 2) / (length / 2 - 1);
        int remainder = (hight - 2) % (length / 2 - 1);
        int group;
        Console.WriteLine("The triangle print:");
        for (int j = 0; j < length / 2; j++)
        {
            Console.Write(" ");
        }
        Console.Write("*");
        Console.WriteLine();
        for (int i = 0; i < result + remainder; i++)
        {
            for (int j = 0; j < length / 2 - 1; j++)
                Console.Write(" ");
            for (int j = 0; j < 3; j++)
                Console.Write("*");
            Console.WriteLine();
        }
        group = 5;
        for (int h = 3; h < length/2 + 1 ; h++)
        {
            for (int i = 0; i < result; i++)
            {
                for (int j = 0; j < (length - group) / 2; j++)
                {
                    Console.Write(" ");
                }
                for (int j = 0; j < group; j++)
                {
                    Console.Write("*");
                }
                Console.WriteLine();
            }
            group = group + 2;
        }
        for (int i = 0; i < length; i++)
        {
            Console.Write("*");
        }
        Console.WriteLine();
    }


    public void PrintScope(int length, int hight)
    {
        int scope = length * hight / 2;
        Print("The perimeter of the triangular is: ", scope);
    }
    public override void Print(string st, int outcome)
    {
        Console.WriteLine(st + outcome);
    }
}
