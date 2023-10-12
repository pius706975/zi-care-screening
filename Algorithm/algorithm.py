main = [20, 7, 8, 10, 2, 5, 6]
seq1 = [7, 8]
seq2 = [8, 7]
seq3 = [7, 10]

def sequenceExists(mainArray, sequence):
    for i in range(len(mainArray)):
        if mainArray[i:i+len(sequence)] == sequence:
            return True
    return False

print(sequenceExists(main, seq1))
print(sequenceExists(main, seq2))
print(sequenceExists(main, seq3))
