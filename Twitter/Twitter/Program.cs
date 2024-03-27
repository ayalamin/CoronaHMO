using System;
using Twitter;

void Main()
{
    int choice;
    int Height, Length;
   
    try
    {
        do
        {
            do
            {
                Console.WriteLine("Pleas enter your choice: 1 for rectangle, 2 for triangle, 3 for exit");
                choice = Convert.ToInt32(Console.ReadLine());
            }
            while (choice != 1 && choice != 2 && choice != 3);
            switch (choice)
            {
                case (1):
                    GetDimensionsFromUser();
                    Rectangle rectangle = new Rectangle();
                    if (Height == Length || Height - Length > 5 || Length - Height > 5)
                        rectangle.PrintSpace(Length, Height);
                    else
                        rectangle.PrintScope(Length, Height);
                    break;
                case (2):
                    GetDimensionsFromUser();
                    Triangular triangular = new Triangular();
                    do
                    {
                        Console.WriteLine("Pleas enter your choice: 1 - Calculate the perimeter of the triangle, 2 -The triangle print");
                        choice = Convert.ToInt32(Console.ReadLine());
                        if (choice == 1)
                        {
                            triangular.PrintScope(Length, Height);
                        }
                        else if (choice == 2)
                        {
                            if (Length % 2 == 0 || Length > Height * 2)
                                Console.WriteLine("The triangle cannot be printed");
                            else
                            {
                                triangular.PrintSpace(Length, Height);
                            }
                        }
                        else
                        {
                            Console.WriteLine("Selection error");
                        }
                    }
                    while (choice != 1 && choice != 2);
                    break;
                case (3):
                    return;
            }
        } while (true);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.ToString());
    }

    void GetDimensionsFromUser()
    {
        Console.WriteLine("Please enter length:");
        Length = Convert.ToInt32(Console.ReadLine());
        Console.WriteLine("Please enter height:");
        Height = Convert.ToInt32(Console.ReadLine());
    }
}



Main();