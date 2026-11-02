/*
  ЗАДАНИЯ ДЛЯ РОБОТА  (файл должен лежать рядом с robot.html)

  Чтобы изменить задание: поправьте функцию ниже и обновите страницу (F5).
  Чтобы добавить задание: допишите функцию с именем  <тип>_task_<номер>
  Типы: algo, for, while, if, cif. Номера идут подряд: 1, 2, 3 ...
  Новые задания сами появятся в меню «Задания».

  Что можно вызывать внутри функции (клетки считаются как (строка, столбец), с 1):
    app.clear_task()                      - очистить поле (вызывать первым)
    app.field(m, n)                       - размер поля: m строк, n столбцов
    app.robot.start_pos(m, n)             - стартовая клетка робота
    app.add_end_position(m, n)            - конечная клетка
    app.add_wall('left'|'right'|'up'|'down', m, n)  - стена у клетки
    app.mark_cell_to_fill(m, n)           - клетка, которую нужно закрасить
    app.save_environment_to_memory()      - сохранить окружение (вызывать последним)
  Доступен модуль random.

  Внутри текста нельзя использовать обратный апостроф ` и сочетание ${
*/
var ROBOT_TASKS = String.raw`
import random
algo_task_1_text = """
Робот должен закрасить клетку 3, двигаясь влево от клетки 2.
"""
# Алгоритмические задания (algo_tasks)
def algo_task_1(app, input_value):
    app.clear_task()
    app.field(5, 5)
    app.robot.start_pos(1,1)
    app.add_end_position(1,2)    
    app.save_environment_to_memory()
    
      # Вызов функции проверки задания

def algo_task_2(app, input_value): 
    app.clear_task()
    app.field(5, 5)
    app.robot.start_pos(3,3)
    app.add_end_position(5,3)    
    app.save_environment_to_memory()
    

def algo_task_3(app, input_value):
    app.clear_task()
    app.field(5, 5)
    app.robot.start_pos(5,5)
    app.add_end_position(5,3) 
    app.add_wall('left',5,4)
    app.add_wall('left',4,4)   
    app.save_environment_to_memory()
    

def algo_task_4(app, input_value):
    app.clear_task()
    app.field(5, 5)
    app.robot.start_pos(5,1)
    app.add_end_position(3,3) 
    app.add_wall('left',5,2)
    app.add_wall('left',4,2)
    app.mark_cell_to_fill(3,2)   
    app.save_environment_to_memory()

def algo_task_5(app, input_value):
    app.clear_task()
    app.field(5, 5)
    app.robot.start_pos(2,3)
    app.add_end_position(1,5)
    for i in range(3,6): 
        app.add_wall('down',1,i)
        app.mark_cell_to_fill(1,i)   
    app.save_environment_to_memory()

def algo_task_6(app, input_value):
    app.clear_task()
    app.field(5, 7)
    app.robot.start_pos(3, 2)
    app.add_end_position(3, 6)
    app.add_wall('left',3,2)
    app.add_wall('right',3,6)
    for i in range(2,7):
        app.mark_cell_to_fill(3,i)
        app.add_wall('up',3,i)
        app.add_wall('down',3,i)    
    app.save_environment_to_memory()

def algo_task_7(app, input_value):
    app.clear_task()
    app.field(5,5)
    app.robot.start_pos(1,1)
    for i in range(2,6):
        app.mark_cell_to_fill(i,i)
    app.add_end_position(5,5)
    app.save_environment_to_memory()

def algo_task_8(app, input_value):
    app.clear_task()
    app.field(4, 4)
    app.robot.start_pos(1, 1)
    app.add_end_position(1, 1)
    for i in range(1,5):
        app.mark_cell_to_fill(i,1)
        app.mark_cell_to_fill(1,i)
        app.mark_cell_to_fill(i,4)
        app.mark_cell_to_fill(4,i)
    app.save_environment_to_memory()
    

def algo_task_9(app, input_value):
    app.clear_task()
    app.field(5,5)
    app.robot.start_pos(1, 1)
    app.add_end_position(5, 5)
    for i in range(1,6):
        if i%2==0:
            app.add_wall('down',i, 5)
            app.add_wall('down',i, 4)
            app.add_wall('down',i, 3)
            app.add_wall('down',i, 2)
        else:
            app.add_wall('down',i, 1) 
            app.add_wall('down',i, 2)
            app.add_wall('down',i, 3)
            app.add_wall('down',i, 4)
    app.save_environment_to_memory()

def algo_task_10(app, input_value):
    app.clear_task()
    app.field(8, 8)    # Сначала устанавливаем размер поля
    
    # Устанавливаем стартовую позицию робота после установки размера поля
    app.robot.start_pos(8, 8)  # Теперь это будет работать, так как поле 8x8
    app.mark_cell_to_fill(5,1)

    app.add_wall('down',2,4)
    app.add_wall('down',4,4)
    app.add_wall('down',4,1)
    app.add_wall('down',4,6)
    app.add_wall('down',7,6)
    app.add_wall('down',6,5)
    app.add_wall('down',6,8)

    app.add_wall('right',3,1)
    app.add_wall('right',2,2)
    app.add_wall('right',2,4)
    app.add_wall('right',4,2)
    app.add_wall('right',2,2)
    app.add_wall('right',5,4)
    app.add_wall('right',3,3)
    app.add_wall('right',8,7)

    for i in range(4):
        app.add_wall('right',4+i,2)
        app.add_wall('down',3,i+2)
        app.add_wall('down',5,i+4)
    for i in range(3):
        app.add_wall('down',1,i+1)
        app.add_wall('right',5+i,1)
        app.add_wall('left',6+i,4)
    for i in range(2):                
        app.add_wall('right',1+i,4)
        app.add_wall('right',7+i,4)
        app.add_wall('right',2+i,5)
        app.add_wall('right',3+i,6)
        app.add_wall('right',6+i,6)
        app.add_wall('down',1,6+i)
        app.add_wall('down',2,7+i)
        app.add_wall('right',4+i,7) 
        
    app.add_end_position(1, 1)
    app.save_environment_to_memory()

# Вспомогательная функция: обносит стенами множество клеток (коридор/комнаты)
def walls_around(app, cells, rows, cols):
    s = set(cells)
    for (m, n) in cells:
        if m > 1 and (m - 1, n) not in s:
            app.add_wall('up', m, n)
        if m < rows and (m + 1, n) not in s:
            app.add_wall('down', m, n)
        if n > 1 and (m, n - 1) not in s:
            app.add_wall('left', m, n)
        if n < cols and (m, n + 1) not in s:
            app.add_wall('right', m, n)

def algo_task_11(app, input_value):
    # Вертикальная змейка: вниз, вверх, вниз... Закрасить клетки, где робот переходит в следующий столбец.
    app.clear_task()
    app.field(6, 6)
    app.robot.start_pos(1, 1)
    app.add_end_position(6, 6)
    for c in range(1, 6):
        if c % 2 == 1:
            for r in range(1, 6):
                app.add_wall('right', r, c)
            app.mark_cell_to_fill(6, c)
        else:
            for r in range(2, 7):
                app.add_wall('right', r, c)
            app.mark_cell_to_fill(1, c)
    app.save_environment_to_memory()

def algo_task_12(app, input_value):
    # Спираль к центру: закрасить все углы спирали.
    app.clear_task()
    app.field(5, 5)
    app.robot.start_pos(1, 1)
    app.add_end_position(3, 3)
    for c in range(1, 5):
        app.add_wall('down', 1, c)
    for r in range(2, 5):
        app.add_wall('right', r, 4)
    for c in range(2, 5):
        app.add_wall('down', 4, c)
    for r in range(3, 5):
        app.add_wall('right', r, 1)
    app.add_wall('down', 2, 2)
    app.add_wall('down', 2, 3)
    app.add_wall('right', 3, 3)
    app.add_wall('down', 3, 3)
    for (m, n) in [(1, 5), (5, 5), (5, 1), (2, 1), (2, 4), (4, 4), (4, 2)]:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def algo_task_13(app, input_value):
    # Лестница-коридор: пройти снизу слева вверх направо и закрасить весь путь.
    app.clear_task()
    app.field(6, 6)
    path = [(6, 1), (6, 2), (5, 2), (5, 3), (4, 3), (4, 4), (3, 4), (3, 5), (2, 5), (2, 6), (1, 6)]
    app.robot.start_pos(6, 1)
    app.add_end_position(1, 6)
    walls_around(app, path, 6, 6)
    for (m, n) in path:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def algo_task_14(app, input_value):
    # Коридор-змейка шириной в одну клетку: закрасить все клетки коридора.
    app.clear_task()
    app.field(5, 5)
    path = []
    for c in range(1, 6):
        path.append((1, c))
    path.append((2, 5))
    for c in range(5, 0, -1):
        path.append((3, c))
    path.append((4, 1))
    for c in range(1, 6):
        path.append((5, c))
    app.robot.start_pos(1, 1)
    app.add_end_position(5, 5)
    walls_around(app, path, 5, 5)
    for (m, n) in path:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def algo_task_15(app, input_value):
    # Коридор с нишами: зайти в каждую нишу, закрасить её и вернуться в коридор.
    app.clear_task()
    app.field(5, 9)
    app.robot.start_pos(3, 1)
    app.add_end_position(3, 9)
    cells = [(3, c) for c in range(1, 10)]
    for c in [2, 4, 6, 8]:
        cells.append((2, c))
        app.mark_cell_to_fill(2, c)
    walls_around(app, cells, 5, 9)
    app.save_environment_to_memory()

def algo_task_16(app, input_value):
    # Гребёнка: зубцы разной высоты. Подняться в каждый зубец, закрасить его верхнюю клетку и вернуться.
    app.clear_task()
    app.field(5, 7)
    app.robot.start_pos(5, 1)
    app.add_end_position(5, 7)
    tops = {1: 2, 3: 4, 5: 3, 7: 1}
    cells = [(5, c) for c in range(1, 8)]
    for c in tops:
        for r in range(tops[c], 5):
            cells.append((r, c))
        app.mark_cell_to_fill(tops[c], c)
    walls_around(app, cells, 5, 7)
    app.save_environment_to_memory()

def algo_task_17(app, input_value):
    # Лабиринт без развилок: пройти от старта до финиша и закрасить все повороты.
    app.clear_task()
    app.field(7, 7)
    path = [(7, 1), (6, 1), (5, 1), (5, 2), (5, 3), (6, 3), (7, 3), (7, 4), (7, 5),
            (6, 5), (5, 5), (4, 5), (3, 5), (3, 4), (3, 3), (3, 2), (3, 1), (2, 1),
            (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (2, 7), (3, 7),
            (4, 7), (5, 7), (6, 7), (7, 7)]
    app.robot.start_pos(7, 1)
    app.add_end_position(7, 7)
    walls_around(app, path, 7, 7)
    for (m, n) in [(5, 1), (5, 3), (7, 3), (7, 5), (3, 5), (3, 1), (1, 1), (1, 7)]:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def algo_task_18(app, input_value):
    # Крест: из центра дойти до конца каждого луча, закрасить его и вернуться в центр.
    app.clear_task()
    app.field(7, 7)
    app.robot.start_pos(4, 4)
    app.add_end_position(4, 4)
    cells = [(4, c) for c in range(1, 8)] + [(r, 4) for r in range(1, 8) if r != 4]
    walls_around(app, cells, 7, 7)
    for (m, n) in [(1, 4), (7, 4), (4, 1), (4, 7)]:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def algo_task_19(app, input_value):
    # Три комнаты 3x3, соединённые узкими проходами. Закрасить центры крайних комнат и углы средней.
    app.clear_task()
    app.field(5, 11)
    app.robot.start_pos(3, 1)
    app.add_end_position(3, 11)
    cells = []
    for start in (1, 5, 9):
        for r in range(2, 5):
            for c in range(start, start + 3):
                cells.append((r, c))
    cells.append((3, 4))
    cells.append((3, 8))
    walls_around(app, cells, 5, 11)
    for (m, n) in [(3, 2), (2, 5), (2, 7), (4, 5), (4, 7), (3, 10)]:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def algo_task_20(app, input_value):
    # Лабиринт с тупиками: пройти из левого нижнего угла в правый нижний, заглянув в каждый тупик и закрасив его.
    app.clear_task()
    app.field(8, 8)
    app.robot.start_pos(8, 1)
    app.add_end_position(8, 8)
    cells = [(r, 1) for r in range(1, 9)]
    cells += [(1, c) for c in range(2, 9)]
    cells += [(r, 8) for r in range(2, 9)]
    cells += [(3, 2), (3, 3)]
    cells += [(5, 2), (5, 3), (5, 4)]
    cells += [(7, 2)]
    cells += [(2, 5), (3, 5), (4, 5)]
    cells += [(3, 7)]
    cells += [(5, 7), (5, 6)]
    cells += [(7, 7)]
    walls_around(app, cells, 8, 8)
    for (m, n) in [(3, 3), (5, 4), (7, 2), (4, 5), (3, 7), (5, 6), (7, 7)]:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

# Задания на циклы For (for_tasks)
def for_task_1(app, task_number):
    app.clear_task()
    app.field(5, 9)
    app.robot.start_pos(3, 2)
    app.add_end_position(3, 8)
    app.add_wall('left',3,2)
    app.add_wall('right',3,8)
    for i in range(7):        
        app.add_wall('up',3,i+2)
        app.add_wall('down',3,i+2)    
    app.save_environment_to_memory()
    

def for_task_2(app, input_value):
    app.clear_task()
    app.field(5, 9)
    app.robot.start_pos(3, 2)
    app.add_end_position(3, 8)
    app.add_wall('left',3,2)
    app.add_wall('right',3,8)
    app.add_wall('up',3,2)
    app.add_wall('down',3,2)
    for i in range(3,9):
        app.mark_cell_to_fill(3,i)
        app.add_wall('up',3,i)
        app.add_wall('down',3,i)    
    app.save_environment_to_memory()

def for_task_3(app, input_value):
    app.clear_task()
    app.field(5, 9)
    app.robot.start_pos(3, 2)
    app.add_end_position(3, 8)
    app.add_wall('left',3,2)
    app.add_wall('right',3,8)
    app.add_wall('up',3,8)
    app.add_wall('down',3,8)
    for i in range(2,8):
        app.mark_cell_to_fill(3,i)
        app.add_wall('up',3,i)
        app.add_wall('down',3,i)    
    app.save_environment_to_memory()

def for_task_4(app, input_value):
    app.clear_task()
    app.field(5, 9)
    app.robot.start_pos(3, 2)
    app.add_end_position(3, 8)
    app.add_wall('left',3,2)
    app.add_wall('right',3,8)    
    for i in range(2,9):
        app.mark_cell_to_fill(3,i)
        app.add_wall('up',3,i)
        app.add_wall('down',3,i)    
    app.save_environment_to_memory()

def for_task_5(app, input_value):
    app.clear_task()
    app.field(7,7)
    app.robot.start_pos(1,1)
    for i in range(2,7):
        app.mark_cell_to_fill(i,i)
    app.add_end_position(7,7)
    app.save_environment_to_memory()

def for_task_6(app, input_value):
    app.clear_task()
    app.field(4, 4)
    app.robot.start_pos(1, 1)
    app.add_end_position(1, 1)
    for i in range(1,5):
        app.mark_cell_to_fill(i,1)
        app.mark_cell_to_fill(1,i)
        app.mark_cell_to_fill(i,4)
        app.mark_cell_to_fill(4,i)
    app.save_environment_to_memory()

def for_task_7(app, input_value):
    app.clear_task()
    app.field(7,5)
    app.robot.start_pos(1, 1)
    app.add_end_position(7, 5)
    for i in range(1,7):
        if i%2==0:
            app.add_wall('down',i, 5)
            app.add_wall('down',i, 4)
            app.add_wall('down',i, 3)
            app.add_wall('down',i, 2)
        else:
            app.add_wall('down',i, 1) 
            app.add_wall('down',i, 2)
            app.add_wall('down',i, 3)
            app.add_wall('down',i, 4)
    app.save_environment_to_memory()

def for_task_8(app, input_value):
    app.clear_task()
    app.field(5, 5)
    app.robot.start_pos(1, 1)
    app.add_end_position(5, 5)
    # Треугольник: в строке i нужно закрасить i клеток
    for i in range(1, 6):
        for j in range(1, i + 1):
            app.mark_cell_to_fill(i, j)
    app.save_environment_to_memory()

def for_task_9(app, input_value):
    app.clear_task()
    app.field(12, 7)
    app.robot.start_pos(2,4)
    app.add_end_position(2,4)
    app.add_wall('up',12,4)
    for i in range(2,12):
        app.add_wall('up',i,4)
        app.mark_cell_to_fill(i,4)
        if i%2==0:
            app.add_wall('right',i,4)            
        else:
            app.add_wall('left',i,4)           
    app.save_environment_to_memory()

def for_task_10(app, input_value):
    app.clear_task()
    app.field(8, 8)
    app.robot.start_pos(1, 2)
    app.add_end_position(1, 2)
    app.add_wall('down',7,2)
    app.add_wall('left',2,2)
    app.add_wall('right',2,7)
    app.mark_cell_to_fill(7,2)
    app.mark_cell_to_fill(2,7)
    app.mark_cell_to_fill(2,2)
    app.mark_cell_to_fill(7,7)
    for i in range(3,8):
        app.add_wall('up',2,i)
        app.add_wall('down',7,i)
        app.add_wall('left',i,2)
        app.add_wall('right',i,7)  
        app.mark_cell_to_fill(i,2)
        app.mark_cell_to_fill(i,7)
        app.mark_cell_to_fill(2,i)
        app.mark_cell_to_fill(7,i)
    for i in range(3,8):
        app.add_wall('up',i,2)
        app.add_wall('up',i,7)
    for i in range(3,6):
        app.add_wall('right',7,i)
        app.add_wall('right',2,i)
    app.save_environment_to_memory()

def for_task_11(app, input_value):
    app.clear_task()
    app.field(8, 8)
    app.robot.start_pos(8, 1)
    app.add_end_position(1, 8)
    for i in range(1, 7):
        app.mark_cell_to_fill(8 - i, 1 + i)
    app.save_environment_to_memory()

def for_task_12(app, input_value):
    app.clear_task()
    app.field(3, 15)
    app.robot.start_pos(2, 1)
    app.add_end_position(2, 15)
    walls_around(app, [(2, c) for c in range(1, 16)], 3, 15)
    for c in range(3, 14, 2):
        app.mark_cell_to_fill(2, c)
    app.save_environment_to_memory()

def for_task_13(app, input_value):
    app.clear_task()
    app.field(10, 10)
    path = [(10, 1)]
    r, c = 10, 1
    for i in range(9):
        c += 1
        path.append((r, c))
        r -= 1
        path.append((r, c))
    app.robot.start_pos(10, 1)
    app.add_end_position(1, 10)
    walls_around(app, path, 10, 10)
    for (m, n) in path:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def for_task_14(app, input_value):
    app.clear_task()
    app.field(4, 11)
    app.robot.start_pos(4, 1)
    app.add_end_position(4, 11)
    cells = [(4, c) for c in range(1, 12)]
    for c in range(1, 12, 2):
        for r in range(1, 4):
            cells.append((r, c))
        app.mark_cell_to_fill(1, c)
    walls_around(app, cells, 4, 11)
    app.save_environment_to_memory()

def for_task_15(app, input_value):
    app.clear_task()
    app.field(7, 8)
    app.robot.start_pos(1, 1)
    app.add_end_position(7, 8)
    for c in range(1, 8):
        if c % 2 == 1:
            for r in range(1, 7):
                app.add_wall('right', r, c)
            app.mark_cell_to_fill(7, c)
        else:
            for r in range(2, 8):
                app.add_wall('right', r, c)
            app.mark_cell_to_fill(1, c)
    app.save_environment_to_memory()

def for_task_16(app, input_value):
    app.clear_task()
    app.field(6, 6)
    app.robot.start_pos(1, 1)
    app.add_end_position(6, 6)
    for i in range(1, 7):
        for j in range(i, 7):
            app.mark_cell_to_fill(i, j)
    app.save_environment_to_memory()

def for_task_17(app, input_value):
    app.clear_task()
    app.field(4, 14)
    app.robot.start_pos(2, 1)
    app.add_end_position(2, 14)
    cells = [(2, c) for c in range(1, 15)]
    for k in range(5):
        c0 = 1 + 3 * k
        cells += [(3, c0), (3, c0 + 1)]
        app.mark_cell_to_fill(3, c0 + 1)
    walls_around(app, cells, 4, 14)
    app.save_environment_to_memory()

def for_task_18(app, input_value):
    app.clear_task()
    app.field(5, 9)
    app.robot.start_pos(1, 1)
    app.add_end_position(5, 9)
    for i in range(1, 6):
        for j in range(1, 10):
            if (i + j) % 2 == 0:
                app.mark_cell_to_fill(i, j)
    app.save_environment_to_memory()

def for_task_19(app, input_value):
    app.clear_task()
    app.field(8, 8)
    app.robot.start_pos(2, 2)
    app.add_end_position(2, 2)
    for i in range(2, 8):
        app.mark_cell_to_fill(2, i)
        app.mark_cell_to_fill(7, i)
        app.mark_cell_to_fill(i, 2)
        app.mark_cell_to_fill(i, 7)
    app.save_environment_to_memory()

def for_task_20(app, input_value):
    app.clear_task()
    app.field(9, 6)
    app.robot.start_pos(1, 1)
    app.add_end_position(9, 6)
    for i in range(1, 10):
        if i % 2 == 0:
            for c in range(2, 7):
                app.add_wall('down', i, c)
            app.mark_cell_to_fill(i, 1)
        else:
            for c in range(1, 6):
                app.add_wall('down', i, c)
            app.mark_cell_to_fill(i, 6)
    app.save_environment_to_memory()

# Задания на условия If (if_tasks)
def if_task_1(app, input_value):
    app.clear_task()
    app.field(3,3)
    app.robot.start_pos(2,2)
    app.add_end_position(2,2)
    if random.random()>0.5:
        app.add_wall('right',2,2)
        app.mark_cell_to_fill(2,2)
    app.save_environment_to_memory()

def if_task_2(app, input_value):
    app.clear_task()
    app.field(3,5)
    app.robot.start_pos(2,4)
    app.add_end_position(2,2)
    if random.random()>0.3:
        app.add_wall('left',2,2)
        app.mark_cell_to_fill(2,2)
    app.save_environment_to_memory()
    
def if_task_3(app, input_value):
    app.clear_task()
    app.field(3,3)
    app.robot.start_pos(2,2)
    app.add_end_position(2,2)
    if random.random()>0.3:
        app.add_wall('left',2,2)
        app.add_wall('right',2,2)
        app.mark_cell_to_fill(1,2)
    else:
        if random.random()>0.5:
            app.add_wall('left',2,2)
        else:
            app.add_wall('right',2,2)
    app.save_environment_to_memory()

def if_task_4(app, input_value):
   app.clear_task()
   app.field(3, 3)
   app.robot.start_pos(2,2)
   dir = random.randint(1, 2)
   if dir==1:
       app.add_wall('left',2,2)
       app.add_end_position(2,3)
   else:
       app.add_wall('right',2,2)
       app.add_end_position(2,1)
   
   app.save_environment_to_memory()

def if_task_5(app, input_value):
    """
    Задача 2 для if: Робот появляется в одной из верхних ячеек (1 или 2)
    и должен приехать в противоположную нижнюю ячейку (4 или 3 соответственно).
    """
    app.clear_task()
    app.field(2, 2)  # Создаем поле 2x2
    
    # Случайно выбираем начальную позицию (1 или 2 ячейка)
    start_cell = random.choice([1, 2])
    if start_cell == 1:
        end_cell = 4  # Правая нижняя ячейка
    else:
        end_cell = 3  # Левая нижняя ячейка
    
    # Устанавливаем начальную позицию робота
    app.robot.start_pos(start_cell)
    
    # Устанавливаем конечную позицию
    app.add_end_position(end_cell)
    
    app.save_environment_to_memory()

def if_task_6(app, input_value):
    """
    Задача 3 для if: Робот появляется в точке (3,3), рядом со стеной.
    Нужно определить положение стены и закрасить клетку с противоположной стороны.
    """
    
    app.field(5, 5)  # Создаем поле 5x5
    
    # Устанавливаем робота в центр поля (3,3)
    center_m, center_n = 3, 3
    app.robot.start_pos(center_m, center_n)
    
    # Словарь противоположных направлений и соответствующих клеток для закраски
    opposite_directions = {
        'up': {'wall_dir': 'down', 'wall_pos': (center_m - 1, center_n),
               'fill_pos': (center_m + 1, center_n)},
        'down': {'wall_dir': 'up', 'wall_pos': (center_m + 1, center_n),
                'fill_pos': (center_m - 1, center_n)},
        'left': {'wall_dir': 'right', 'wall_pos': (center_m, center_n - 1),
                'fill_pos': (center_m, center_n + 1)},
        'right': {'wall_dir': 'left', 'wall_pos': (center_m, center_n + 1),
                 'fill_pos': (center_m, center_n - 1)}
    }
    
    # Случайно выбираем направление для стены
    wall_direction = random.choice(list(opposite_directions.keys()))
    direction_info = opposite_directions[wall_direction]
    
    # Добавляем стену
    wall_m, wall_n = direction_info['wall_pos']
    app.add_wall(direction_info['wall_dir'], wall_m, wall_n)
    
    
    # Отмечаем клетку для закраски с противоположной стороны
    fill_m, fill_n = direction_info['fill_pos']
    app.add_end_position(fill_m, fill_n)
    app.mark_cell_to_fill(fill_m, fill_n)
    
    app.save_environment_to_memory()


def if_task_7(app, input_value):
    app.clear_task()
    app.field(3, 3)
    rand = random.randint(1, 4) 
    if rand == 1:
        app.robot.start_pos(2,2)
        app.add_wall('up',2,2)
        app.add_wall('left',2,2)
        app.add_wall('down',2,2)
        app.add_end_position(2,3)
        app.mark_cell_to_fill(2,3)
    elif rand == 2:
        app.robot.start_pos(2,2)
        app.add_wall('up',2,2)
        app.add_wall('right',2,2)
        app.add_wall('down',2,2)
        app.add_end_position(2,1)
        app.mark_cell_to_fill(2,1)
    elif rand == 3:
        app.robot.start_pos(2,2)
        app.add_wall('down',2,2)
        app.add_wall('left',2,2)
        app.add_wall('right',2,2)
        app.add_end_position(1,2)
        app.mark_cell_to_fill(1,2)
    elif rand == 4:
        app.robot.start_pos(2,2)
        app.add_wall('up',2,2)
        app.add_wall('left',2,2)
        app.add_wall('right',2,2)
        app.add_end_position(3,2)
        app.mark_cell_to_fill(3,2)
                
    app.save_environment_to_memory()


def if_task_8(app, input_value):
    app.clear_task()
    app.field(4, 4)
    rand = random.randint(1, 4) 
    if rand == 1:
        app.robot.start_pos(2,2)
        app.add_wall('up',2,2)
        app.add_wall('left',2,2)
        app.add_end_position(3,3)
    elif rand == 2:
        app.robot.start_pos(2,3)
        app.add_wall('up',2,3)
        app.add_wall('right',2,3)
        app.add_end_position(3,2)
    elif rand == 3:
        app.robot.start_pos(3,2)
        app.add_wall('down',3,2)
        app.add_wall('left',3,2)
        app.add_end_position(2,3)
    elif rand == 4:
        app.robot.start_pos(3,3)
        app.add_wall('down',3,3)
        app.add_wall('right',3,3)
        app.add_end_position(2,2)

    app.save_environment_to_memory()

def if_task_9(app, input_value): 

    app.clear_task()
    app.field(5, 5)  # Создаем поле 5x5
    
    # Устанавливаем робота в центр поля (3,3)
    center_m, center_n = 3, 3
    app.robot.start_pos(center_m, center_n)
    app.add_end_position(center_m, center_n)
    
    # Случайно добавляем стены
    directions = ['up', 'down', 'left', 'right'] # Вычисляем номер центральной ячейки
    
    # Словарь для связи направления и соответствующей ячейки для закраски
    cells_to_mark = {
        'up': (center_m - 1, center_n),     # Клетка сверху
        'down': (center_m + 1, center_n),   # Клетка снизу
        'left': (center_m, center_n - 1),   # Клетка слева
        'right': (center_m, center_n + 1)   # Клетка справа
    }
    
    # Случайно выбираем, какие стены будут присутствовать
    for direction in directions:
        if random.choice([True, False]):  # 50% шанс для каждой стены
            if direction == 'down':
                app.add_wall('down', 3+1, 3)  # Стена снизу
            elif direction == 'up':
                app.add_wall('up', 3-1, 3)    # Стена сверху
            elif direction == 'right':
                app.add_wall('right', 3, 3+1) # Стена слева
            elif direction == 'left':
                app.add_wall('left', 3, 3-1)  # Стена справа
            
            # Отмечаем клетку для закраски
            m, n = cells_to_mark[direction]
            app.mark_cell_to_fill(m, n)
    
    # Добавляем центральную клетку для закраски
    app.mark_cell_to_fill(center_m, center_n)
    
    # Устанавливаем конечную позицию в центре
    
    
    app.save_environment_to_memory()

def if_task_10(app, input_value):
    app.clear_task()
    app.field(5, 5)
    center_m, center_n = 3, 3
    app.robot.start_pos(center_m, center_n)
    
    # Случайно добавляем стены в углах
    corners = [(2,2), (2,4), (4,2), (4,4)]
    for m, n in random.sample(corners, 2):
        app.add_wall('up' if m < 3 else 'down', m, n)
        app.add_wall('left' if n < 3 else 'right', m, n)
        app.mark_cell_to_fill(m, n)
    
    app.add_end_position(center_m, center_n)
    app.save_environment_to_memory()





# Задания на сложные условия (cif_tasks)
def cif_task_1(app, input_value):
    app.clear_task()
    corridor_length = random.randint(2, 9)
    required_width = 1 + corridor_length
    app.field(3, required_width)  
    app.robot.start_pos(2, 2)  # m=3, n=2
    app.add_end_position(2,corridor_length)
    app.add_wall('right',2,corridor_length)
    for i in range(3,corridor_length+1):
        if random.random() < 0.5:  # 50% шанс на выполнение команды
            # Добавляем верхнюю стену коридора
            app.add_wall('up', 2,  i)
            app.mark_cell_to_fill(2, i)           
    app.save_environment_to_memory()

def cif_task_2(app, input_value):
    app.clear_task()
    corridor_length = random.randint(2, 9)
    required_width = 1 + corridor_length
    app.field(3, required_width)  
    app.robot.start_pos(2, 2)
    app.add_end_position(2, corridor_length)
    app.add_wall('right', 2, corridor_length)
    
    for i in range(3, corridor_length+1):
        if random.random() < 0.5:  # 50% шанс на выполнение команды
            # Случайно выбираем верхнюю или нижнюю стену
            wall_position = random.choice(['up', 'down'])
            app.add_wall(wall_position, 2, i)
            app.mark_cell_to_fill(2,  i)
            
    app.save_environment_to_memory()
   

def cif_task_3(app, input_value):
    app.clear_task()
    corridor_length = random.randint(2, 9)
    required_width = 1 + corridor_length
    app.field(3, required_width)  
    app.robot.start_pos(2, 1)
    app.add_end_position(2, corridor_length)
    app.add_wall('right', 2, corridor_length)
    
    for i in range(1, corridor_length):
        has_up_wall = random.random() < 0.7    # 50% шанс на верхнюю стену
        has_down_wall = random.random() < 0.7   # 50% шанс на нижнюю стену
        
        # Добавляем стены если они выпали
        if has_up_wall:
            app.add_wall('up', 2, 1 + i)
        if has_down_wall:
            app.add_wall('down', 2, 1 + i)
            
        # Закрашиваем клетку только если есть обе стены
        if has_up_wall and has_down_wall:
            app.mark_cell_to_fill(2, 1 + i)
            
    app.save_environment_to_memory()
    

def cif_task_4(app, input_value):
    app.clear_task()
    rand = random.randint(3,9)
    app.field(rand+2,5)
    app.robot.start_pos(2,3)
    app.add_end_position(rand+1,3)
    app.add_wall('down',rand+1,3)
    for i in range(3,rand+2):
        if random.random()>0.4:
            app.add_wall('left',i,3)
        else:
            app.mark_cell_to_fill(i,2)


    app.save_environment_to_memory()

def cif_task_5(app, input_value):
    app.clear_task()
    rand = random.randint(3,9)
    app.field(rand+2,5)
    app.robot.start_pos(2,3)
    app.add_end_position(rand+1,3)
    app.add_wall('down',rand+1,3)
    for i in range(3,rand+2):
        if random.random()>0.4:
            app.add_wall('left',i,3)
        else:
            app.mark_cell_to_fill(i,2)
        if random.random()>0.4:
            app.add_wall('right',i,3)
        else:
            app.mark_cell_to_fill(i,4)


    app.save_environment_to_memory()

def cif_task_6(app, input_value):
    app.clear_task()
    rand = random.randint(3,9)
    app.field(rand+2,5)
    app.robot.start_pos(2,3)
    app.add_end_position(rand+1,3)
    app.add_wall('down',rand+1,3)
    for i in range(3,rand+2):
        if random.random()>0.4:
            app.add_wall('left',i,3)
            app.mark_cell_to_fill(i,4)
        else:            
            app.add_wall('right',i,3)        
            app.mark_cell_to_fill(i,2)


    app.save_environment_to_memory()

def cif_task_7(app, input_value):
    app.clear_task()
    rand = random.randint(3,9)
    app.field(rand+2,5)
    app.robot.start_pos(2,3)
    app.add_end_position(rand+1,3)
    app.add_wall('down',rand+1,3)
    for i in range(3,rand+2):
        if random.random()>0.4:
            if random.random()>0.4:
                app.add_wall('left',i,3)
                app.mark_cell_to_fill(i,4)
            else:            
                app.add_wall('right',i,3)        
                app.mark_cell_to_fill(i,2)
        else:
            app.add_wall('left',i,3)
            app.add_wall('right',i,3) 
            app.mark_cell_to_fill(i,3)
    app.save_environment_to_memory()

def cif_task_8(app, input_value):
    app.clear_task()
    rand = random.randint(2,9)
    app.field(rand, rand)  # Создаем поле 2x2
    if random.random()>0.5:
        app.robot.start_pos(1,1)
        app.add_end_position(rand,rand)
    else:
        app.robot.start_pos(rand,rand)
        app.add_end_position(1,1)
    
    app.save_environment_to_memory()

def cif_task_9(app, input_value):
    app.clear_task()
    a = random.randint(2,7)
    b = random.randint(2,5)
    app.field(9,13)
    dir = random.choice(['left', 'right']) 
    app.robot.start_pos(9,7)
    if dir=='left':        
        app.add_end_position(9-a,7-b)
        for i in range(7-b,7):
            app.add_wall('up',9-a,i) 
            app.add_wall('down',9-a,i)
        for i in range(10-a,10):
            app.add_wall('left',i,7)
            app.add_wall('right',i,7)
        app.add_wall('up',9-a,7)
        app.add_wall('right',9-a,7)
        app.add_wall('left',9-a,7-b)
    else:        
        app.add_end_position(9-a,7+b)
        for i in range(8,7+b+1):
            app.add_wall('up',9-a,i) 
            app.add_wall('down',9-a,i)
        for i in range(10-a,10):
            app.add_wall('left',i,7)
            app.add_wall('right',i,7)
        app.add_wall('up',9-a,7)
        app.add_wall('right',9-a,7+b)
        app.add_wall('left',9-a,7)
    app.save_environment_to_memory()


def cif_task_10(app, input_value):
    app.clear_task()
    a=0
    b=0
    while a==b:
        a=random.randint(2,7)
        b=random.randint(2,7)
    maximum = max(a,b)
    app.field(9,4)
    app.robot.start_pos(2,2)
    for i in range(2,a+2):
        app.add_wall('left',i,2)
    for i in range(2,b+2):
        app.add_wall('right',i,3)
    if a>b:
        app.add_end_position(maximum+1,2)
    else:
        app.add_end_position(maximum+1,3)
    app.save_environment_to_memory()

# Задания на циклы While (while_tasks)
def while_task_1(app, input_value):
    app.clear_task()
    corridor_length = random.randint(2, 7)
    required_width = 2 + corridor_length
    app.field(5, required_width)  
    app.robot.start_pos(3, 2)  # m=3, n=2
    app.add_end_position(3,2+corridor_length-1)
    app.add_wall('left', 3,2)
    app.add_wall('right',3,2+corridor_length-1)
    # Добавляем стены для формирования коридора
    for i in range(corridor_length ):   
        # Добавляем верхнюю стену коридора
        app.add_wall('up',3, 2+i)        
        app.add_wall('down',3, 2+i)
    app.save_environment_to_memory()

def while_task_2(app, input_value):
    app.clear_task()
    corridor_length = random.randint(2, 7)
    required_width = 2 + corridor_length
    app.field(5, required_width)  
    app.robot.start_pos(3, 2)  # m=3, n=2
    app.add_end_position(3,2+corridor_length-1)
    app.add_wall('left', 3,2)
    app.add_wall('right',3,2+corridor_length-1)
    # Добавляем стены для формирования коридора
    for i in range(corridor_length):    
        # Добавляем верхнюю стену коридора
        app.add_wall('up',3, 2+i)
        app.add_wall('down',3, 2+i)
    for i in range(corridor_length-1):   
        # Добавляем верхнюю стену коридора        
        app.mark_cell_to_fill(3,2+i)
        
    app.save_environment_to_memory()

def while_task_3(app, input_value):
    app.clear_task()
    corridor_length = random.randint(2, 7)
    required_width = 2 + corridor_length
    app.field(5, required_width)  
    app.robot.start_pos(3, 2)  # m=3, n=2
    app.add_end_position(3,2+corridor_length-1)
    app.add_wall('left', 3,2)
    app.add_wall('right',3,2+corridor_length-1)
    # Добавляем стены для формирования коридора
    for i in range(corridor_length ):    
        # Добавляем верхнюю стену коридора
        app.add_wall('up',3, 2+i)        
        app.add_wall('down',3, 2+i)
    for i in range(3,corridor_length+2):               
        app.mark_cell_to_fill(3,i)
        
    app.save_environment_to_memory()    

def while_task_4(app, input_value):
    app.clear_task()
    corridor_length = random.randint(2, 7)
    required_width = 2 + corridor_length
    app.field(5, required_width)  
    app.robot.start_pos(3, 2)  # m=3, n=2
    app.add_end_position(3,2+corridor_length-1)
    app.add_wall('left', 3,2)
    app.add_wall('right',3,2+corridor_length-1)
    # Добавляем стены для формирования коридора
    for i in range(corridor_length ):    
        # Добавляем верхнюю стену коридора
        app.add_wall('up',3, 2+i)        
        app.add_wall('down',3, 2+i)
    for i in range(2,corridor_length+2):               
        app.mark_cell_to_fill(3,i)
        
    app.save_environment_to_memory()

def while_task_5(app, input_value):
    app.clear_task()
    length = random.randint(2, 9)
    app.field(length+1, length+1)
    app.robot.start_pos(1,1)
    app.add_end_position(length+1,length+1)
    for i in range(1,length+1):
        app.mark_cell_to_fill(i+1,i+1)
    app.save_environment_to_memory()

def while_task_6(app, input_value):
    app.clear_task()
    length = random.randint(2, 9)
    app.field(length, length)
    app.robot.start_pos(1, 1)
    app.add_end_position(1,1)
    for i in range(1,length+1):
        app.mark_cell_to_fill(i,1)
        app.mark_cell_to_fill(1,i)
        app.mark_cell_to_fill(i,length)
        app.mark_cell_to_fill(length,i)
    app.save_environment_to_memory()

def while_task_7(app, input_value):
    # Коридор-уголок: сначала вправо до стены, потом вниз до стены. Закрасить весь коридор.
    app.clear_task()
    a = random.randint(3, 7)
    b = random.randint(3, 6)
    top = 2
    left = 2
    right = left + a - 1
    bottom = top + b - 1
    app.field(bottom + 1, right + 1)
    app.robot.start_pos(top, left)
    app.add_end_position(bottom, right)
    app.add_wall('left', top, left)
    for c in range(left, right + 1):
        app.add_wall('up', top, c)
        app.mark_cell_to_fill(top, c)
        if c < right:
            app.add_wall('down', top, c)
    for r in range(top, bottom + 1):
        app.add_wall('right', r, right)
        app.mark_cell_to_fill(r, right)
        if r > top:
            app.add_wall('left', r, right)
    app.add_wall('down', bottom, right)
    app.save_environment_to_memory()

def while_task_8(app, input_value):
    # Коридор-зигзаг: вправо до стены, вниз до стены, снова вправо до стены. Закрасить весь коридор.
    app.clear_task()
    a = random.randint(3, 6)
    b = random.randint(3, 5)
    c = random.randint(3, 6)
    left = 2
    top = 2
    c1 = left + a - 1
    c2 = c1 + c - 1
    bottom = top + b - 1
    app.field(bottom + 1, c2 + 1)
    app.robot.start_pos(top, left)
    app.add_end_position(bottom, c2)
    app.add_wall('left', top, left)
    for col in range(left, c1 + 1):
        app.add_wall('up', top, col)
        app.mark_cell_to_fill(top, col)
        if col < c1:
            app.add_wall('down', top, col)
    for r in range(top, bottom + 1):
        app.mark_cell_to_fill(r, c1)
        if r < bottom:
            app.add_wall('right', r, c1)
        if r > top:
            app.add_wall('left', r, c1)
    for col in range(c1, c2 + 1):
        app.add_wall('down', bottom, col)
        app.mark_cell_to_fill(bottom, col)
        if col > c1:
            app.add_wall('up', bottom, col)
    app.add_wall('right', bottom, c2)
    app.save_environment_to_memory()

def while_task_9(app, input_value):
    # Треугольная комната из стен: закрасить её целиком, строка за строкой.
    app.clear_task()
    k = random.randint(3, 7)
    app.field(k, k)
    app.robot.start_pos(1, 1)
    app.add_end_position(k, k)
    for r in range(1, k + 1):
        app.add_wall('right', r, r)
        if r > 1:
            app.add_wall('up', r, r)
        for col in range(1, r + 1):
            app.mark_cell_to_fill(r, col)
    app.save_environment_to_memory()

def while_task_10(app, input_value):
    # Обойти препятствие (блок из стен) сверху и закрасить путь вокруг него.
    app.clear_task()
    m = 8
    h = random.randint(2, 4)
    w = random.randint(2, 4)
    c0 = random.randint(3, 5)
    n = c0 + w + 2
    app.field(m, n)
    app.robot.start_pos(m, 1)
    app.add_end_position(m, n)
    top = m - h + 1
    for r in range(top, m + 1):
        app.add_wall('left', r, c0)
        app.add_wall('right', r, c0 + w - 1)
    for c in range(c0, c0 + w):
        app.add_wall('up', top, c)
    for r in range(top - 1, m + 1):
        app.mark_cell_to_fill(r, c0 - 1)
        app.mark_cell_to_fill(r, c0 + w)
    for c in range(c0, c0 + w):
        app.mark_cell_to_fill(top - 1, c)
    app.save_environment_to_memory()

def while_task_11(app, input_value):
    # Вертикальный коридор случайной длины: дойти до стены, закрасив весь коридор.
    app.clear_task()
    L = random.randint(3, 10)
    app.field(L + 2, 5)
    cells = [(r, 3) for r in range(2, L + 2)]
    app.robot.start_pos(2, 3)
    app.add_end_position(L + 1, 3)
    walls_around(app, cells, L + 2, 5)
    for (m, n) in cells:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def while_task_12(app, input_value):
    # Коридор со случайным числом ниш сверху: закрасить каждую нишу.
    app.clear_task()
    k = random.randint(2, 6)
    w = 2 * k + 1
    app.field(4, w)
    app.robot.start_pos(3, 1)
    app.add_end_position(3, w)
    cells = [(3, c) for c in range(1, w + 1)]
    for c in range(2, w, 2):
        cells.append((2, c))
        app.mark_cell_to_fill(2, c)
    walls_around(app, cells, 4, w)
    app.save_environment_to_memory()

def while_task_13(app, input_value):
    # Лестница случайной высоты: подняться по ступеням и закрасить весь путь.
    app.clear_task()
    k = random.randint(3, 8)
    app.field(k + 1, k + 1)
    r, c = k + 1, 1
    path = [(r, c)]
    for i in range(k):
        c += 1
        path.append((r, c))
        r -= 1
        path.append((r, c))
    app.robot.start_pos(k + 1, 1)
    app.add_end_position(1, k + 1)
    walls_around(app, path, k + 1, k + 1)
    for (m, n) in path:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def while_task_14(app, input_value):
    # Коридор-«подкова»: вниз, вправо, вверх до стены. Закрасить весь коридор.
    app.clear_task()
    a = random.randint(2, 5)
    b = random.randint(2, 6)
    rows = a + 3
    cols = b + 4
    cells = []
    for r in range(2, 2 + a + 1):
        cells.append((r, 2))
        cells.append((r, 2 + b + 1))
    for c in range(2, 2 + b + 2):
        cells.append((2 + a, c))
    cells = list(set(cells))
    app.field(rows, cols)
    app.robot.start_pos(2, 2)
    app.add_end_position(2, 2 + b + 1)
    walls_around(app, cells, rows, cols)
    for (m, n) in cells:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def while_task_15(app, input_value):
    # Побочная диагональ квадрата случайного размера: закрасить все клетки диагонали.
    app.clear_task()
    n = random.randint(4, 10)
    app.field(n, n)
    app.robot.start_pos(n, 1)
    app.add_end_position(1, n)
    for i in range(1, n + 1):
        app.mark_cell_to_fill(n - i + 1, i)
    app.save_environment_to_memory()

def while_task_16(app, input_value):
    # Гребёнка со случайным числом зубцов и случайной высотой: закрасить верхушки зубцов.
    app.clear_task()
    k = random.randint(2, 5)
    h = random.randint(2, 4)
    w = 2 * k - 1
    rows = h + 1
    app.field(rows, w)
    app.robot.start_pos(rows, 1)
    app.add_end_position(rows, w)
    cells = [(rows, c) for c in range(1, w + 1)]
    for c in range(1, w + 1, 2):
        for r in range(1, rows):
            cells.append((r, c))
        app.mark_cell_to_fill(1, c)
    walls_around(app, cells, rows, w)
    app.save_environment_to_memory()

def while_task_17(app, input_value):
    # Коридор случайной длины: закрасить только те клетки, над которыми есть стена.
    app.clear_task()
    L = random.randint(4, 12)
    app.field(3, L + 1)
    app.robot.start_pos(2, 1)
    app.add_end_position(2, L)
    walls_around(app, [(2, c) for c in range(1, L + 1)], 3, L + 1)
    for c in range(1, L + 1):
        if random.random() < 0.5:
            app.mark_cell_to_fill(2, c)
    app.save_environment_to_memory()

def while_task_18(app, input_value):
    # Кольцевой коридор: вправо, вниз, влево, вверх до стены. Закрасить всё кольцо.
    app.clear_task()
    a = random.randint(4, 6)
    b = random.randint(4, 7)
    rows = a + 2
    cols = b + 2
    top = 2
    left = 2
    ring = []
    for c in range(left, left + b):
        ring.append((top, c))
        ring.append((top + a - 1, c))
    for r in range(top, top + a):
        ring.append((r, left))
        ring.append((r, left + b - 1))
    ring = list(set(ring))
    app.field(rows, cols)
    app.robot.start_pos(top, left)
    app.add_end_position(top + 1, left)
    walls_around(app, ring, rows, cols)
    app.add_wall('down', top, left)
    for (m, n) in ring:
        app.mark_cell_to_fill(m, n)
    app.save_environment_to_memory()

def while_task_19(app, input_value):
    # Ряд комнат 2x2 со случайным числом комнат: закрасить правую нижнюю клетку каждой комнаты.
    app.clear_task()
    k = random.randint(2, 5)
    w = 3 * k - 1
    app.field(4, w)
    app.robot.start_pos(2, 1)
    app.add_end_position(2, w)
    cells = [(2, c) for c in range(1, w + 1)]
    for j in range(k):
        c0 = 1 + 3 * j
        cells += [(3, c0), (3, c0 + 1)]
        app.mark_cell_to_fill(3, c0 + 1)
    walls_around(app, cells, 4, w)
    app.save_environment_to_memory()

def while_task_20(app, input_value):
    # Змейка случайного размера: пройти все ряды и закрасить клетки, где змейка разворачивается.
    app.clear_task()
    rows = random.randint(3, 8)
    cols = random.randint(4, 8)
    app.field(rows, cols)
    app.robot.start_pos(1, 1)
    if rows % 2 == 1:
        app.add_end_position(rows, cols)
    else:
        app.add_end_position(rows, 1)
    for i in range(1, rows):
        if i % 2 == 1:
            for c in range(1, cols):
                app.add_wall('down', i, c)
            app.mark_cell_to_fill(i, cols)
        else:
            for c in range(2, cols + 1):
                app.add_wall('down', i, c)
            app.mark_cell_to_fill(i, 1)
    app.save_environment_to_memory()

`;
