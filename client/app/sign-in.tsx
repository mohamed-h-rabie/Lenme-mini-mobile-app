import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSignIn from "@/hooks/useSignIn";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { useSession } from "@/components/providers/SessionProvider";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required" }),
});
type SignInSchemaType = z.infer<typeof signInSchema>;

const TEST_EMAIL = "test@example.com";
const TEST_PASSWORD = "password123";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

const SignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const c = theme.dark ? Colors.dark : Colors.light;
  const [showPassword, setShowPassword] = useState(false);
  const [mockAuthError, setMockAuthError] = useState<string | null>(null);
  const { mutate: handleSignIn, isPending, error: signInError } = useSignIn();
  const { signIn: createSession } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onChange", // 👈 IMPORTANT
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<SignInSchemaType> = (data: SignInSchemaType) => {
    setMockAuthError(null);
    if (data.email === TEST_EMAIL) {
      if (data.password === TEST_PASSWORD) {
        createSession("mock-test-token", Date.now() + SESSION_DURATION_MS);
        return;
      }
      setMockAuthError("Invalid email or password");
      return;
    }
    handleSignIn(data);
  };

  return (
    <View
      style={{
        backgroundColor: c.background.primary,
        flex: 1,
        paddingHorizontal: 24,
        gap: 16,
        paddingTop: 59,
      }}
    >
      <View>
        <Text style={[styles.headerText, { color: c.text.primary }]}>Login to your account</Text>
        <Text style={[styles.secondaryText, { color: c.text.secondary }]}>It’s great to see you again.</Text>
      </View>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({
          field: { onChange, value },
          fieldState: { error, isDirty },
        }) => {
          const isSuccess = !error && isDirty;
          return (
            <Input
              label="Email"
              placeholder="Enter your email"
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
              errors={errors.email}
              isSuccess={isSuccess}
            />
          );
        }}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => {
          const isSuccess = !error && isDirty;
          return (
            <Input
              label="Password"
              placeholder="Enter your password"
              onChangeText={onChange}
              secureTextEntry={!showPassword}
              value={value}
              error={!!errors.password}
              errors={errors.password}
              isSuccess={isSuccess}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />
          );
        }}
        name="password"
      />
      <Text
        style={{
          textAlign: "left",
          fontSize: 16,
          fontFamily: "generalRegular",
          color: c.text.secondary,
        }}
      >
        Forgot your password?
        <Text
          onPress={() => navigation.navigate("ForgetPassword")}
          style={{
            color: c.text.primary,
            fontFamily: "generalMedium",
            textDecorationLine: "underline",
            textDecorationColor: c.text.primary,
            textDecorationStyle: "solid",
            marginLeft: 3,
          }}
        > 
          Reset your password{" "}
        </Text>
      </Text>
      {(mockAuthError || signInError) && (
        <Text
          style={{
            color: "#ED1010",
            textAlign: "center",
            fontFamily: "generalMedium",
          }}
        >
          {mockAuthError || signInError?.message || "Something went wrong"}
        </Text>
      )}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.createButton,
          { borderColor: c.border.default },
          errors && !isValid ? { backgroundColor: c.interactive.disabled } : { backgroundColor: c.button.primaryBg },
        ]}
        disabled={errors && !isValid}
      >
        {isPending ? (
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            size="small"
            color={c.brand.onPrimary}
          />
        ) : (
          <Text
            style={{
              color: c.button.primaryText,
              textAlign: "center",
              fontSize: 16,
              fontFamily: "generalMedium",
            }}
          >
            Login
          </Text>
        )}
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontFamily: "generalRegular",
          color: c.text.secondary,
        }}
      >
        It’s great to see you again.{" "}
        <Text
          onPress={() => navigation.navigate("SignUp")}
          style={{
            color: c.text.primary,
            fontFamily: "generalMedium",
            textDecorationLine: "underline",
            textDecorationColor: c.text.primary,
            textDecorationStyle: "solid",
          }}
        >
          Join
        </Text>
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  headerText: {
    color: "#1A1A1A",
    fontSize: 32,
    letterSpacing: -1.6,
    fontFamily: "generalSemiBold",
  },
  secondaryText: {
    color: "#808080",
    marginTop: 12,
    fontSize: 16,
    fontFamily: "generalRegular",
  },
  createButton: {
    // backgroundColor: "#CCCCCC",
    paddingHorizontal: 84,
    paddingVertical: 16,
    marginTop: 16,
    // fontSize: 16,
    // fontFamily: "generalRegular",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: "#CCCCCC",
  },
  enabled: {
    backgroundColor: "#1A1A1A",
  },
});
