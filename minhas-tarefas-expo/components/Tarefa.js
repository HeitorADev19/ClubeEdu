import { Pressable, Text, View } from 'react-native';
import styles from '../style.js'

export default function Tarefa({ tarefa, onAlternar, onExcluir }) {
  return (
    <View style={styles.tarefa}>
      <Pressable
        style={styles.tarefaPrincipal}
        onPress={() => onAlternar(tarefa.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: tarefa.concluida }}
        accessibilityLabel={tarefa.texto}
      >
        <Text style={styles.marcador} accessibilityElementsHidden>
          {tarefa.concluida ? '☑' : '☐'}
        </Text>
        <Text style={[styles.textoTarefa, tarefa.concluida && styles.concluida]}>
          {tarefa.texto}
        </Text>
      </Pressable>
      <Pressable
        style={styles.excluir}
        onPress={() => onExcluir(tarefa.id)}
        accessibilityRole="button"
        accessibilityLabel={`Excluir tarefa: ${tarefa.texto}`}
      >
        <Text style={styles.textoExcluir}>Excluir</Text>
      </Pressable>
    </View>
  );
}