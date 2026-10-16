import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tarefa from "./components/Tarefa";
import styles from "./style";

const CHAVE = "@aula-mobile:tarefas";

export default function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [podeSalvar, setPodeSalvar] = useState(false);
  const [erro, setErro] = useState("");
  const proximoId = useRef(0);
  const filaDeSalvamento = useRef(Promise.resolve());

  // Carrega os dados uma vez, antes de permitir alterações.
  useEffect(() => {
    let ativo = true;
    async function carregar() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE);
        const dados = salvo ? JSON.parse(salvo) : [];
        if (!Array.isArray(dados)) throw new Error("Lista inválida");
        const validas = dados.filter(
          (t) =>
            t &&
            typeof t.id === "string" &&
            typeof t.texto === "string" &&
            typeof t.concluida === "boolean",
        );
        if (ativo) {
          setTarefas(validas);
          setPodeSalvar(true);
        }
      } catch {
        if (ativo)
          setErro(
            "Não foi possível ler os dados. A lista ficará temporária nesta sessão.",
          );
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregar();
    return () => {
      ativo = false;
    };
  }, []);

  // Espera o carregamento; salva alterações na ordem em que ocorreram.
  useEffect(() => {
    if (carregando || !podeSalvar) return;
    const dados = JSON.stringify(tarefas);
    filaDeSalvamento.current = filaDeSalvamento.current
      .then(() => AsyncStorage.setItem(CHAVE, dados))
      .catch(() => setErro("Não foi possível salvar a última alteração."));
  }, [tarefas, carregando, podeSalvar]);

  function adicionar() {
    const valor = texto.trim();
    if (!valor || carregando) return;
    const id = `${Date.now()}-${proximoId.current++}`;
    setTarefas((lista) => [...lista, { id, texto: valor, concluida: false }]);
    setTexto("");
    Keyboard.dismiss();
  }

  function alternar(id) {
    setTarefas((lista) =>
      lista.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );
  }

  function excluir(id) {
    setTarefas((lista) => lista.filter((t) => t.id !== id));
  }

  const concluidas = tarefas.filter((t) => t.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Text style={styles.titulo}>Minhas Tarefas</Text>
          <Text style={styles.subtitulo}>
            Minha primeira aplicação com React Native e Expo.
          </Text>
          <Text style={styles.label}>Nova tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: estudar programação"
            placeholderTextColor="#64748b"
            accessibilityLabel="Nova tarefa"
            value={texto}
            onChangeText={setTexto}
            onSubmitEditing={adicionar}
            returnKeyType="done"
            maxLength={150}
            editable={!carregando}
          />
          <Pressable
            onPress={adicionar}
            disabled={carregando || !texto.trim()}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.botao,
              (carregando || !texto.trim() || pressed) && styles.botaoOpaco,
            ]}
          >
            <Text style={styles.textoBotao}>Adicionar tarefa</Text>
          </Pressable>
          <Text style={styles.resumo}>
            {tarefas.length} tarefa(s) • {concluidas} concluída(s)
          </Text>
          {erro ? (
            <Text style={styles.erro} accessibilityRole="alert">
              {erro}
            </Text>
          ) : null}
          <FlatList
            style={styles.lista}
            data={tarefas}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.conteudoLista}
            ListEmptyComponent={
              <Text style={styles.vazio}>
                {carregando ? "Carregando..." : "Nenhuma tarefa cadastrada."}
              </Text>
            }
            renderItem={({ item }) => (
              <Tarefa tarefa={item} onAlternar={alternar} onExcluir={excluir} />
            )}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
