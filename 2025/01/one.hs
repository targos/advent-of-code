main = do
  input <- getContents
  print (solveExercise input)

solveExercise = length . filter (== 0) . scanl moveDial start . map parseInstruction . lines

numPositions = 100

start = 50

type Instruction = (Char, Int)

parseInstruction :: String -> Instruction
parseInstruction (side : rest) = (side, read rest :: Int)

moveDial :: Int -> Instruction -> Int
moveDial position instruction
  | side == 'R' = (position + steps) `mod` numPositions
  | side == 'L' = moveDial position ('R', numPositions - steps)
  where
    side = fst instruction
    steps = snd instruction
